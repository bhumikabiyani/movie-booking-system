package database

import (
    "io/ioutil"
    "log"
    "os"
    "path/filepath"

    "gopkg.in/yaml.v2"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

var DB *gorm.DB

type Config struct {
    User     string `yaml:"user"`
    Password string `yaml:"password"`
    DBName   string `yaml:"dbname"`
    Host     string `yaml:"host"`
    Port     string `yaml:"port"`
    SSLMode  string `yaml:"sslmode"`
}

func loadConfig() (*Config, error) {
    wd, err := os.Getwd()
    if err != nil {
        return nil, err
    }

    data, err := ioutil.ReadFile(filepath.Join(wd, "config.yaml"))
    if err != nil {
        return nil, err
    }

    var config Config
    err = yaml.Unmarshal(data, &config)
    if err != nil {
        return nil, err
    }

    return &config, nil
}

func ConnectDatabase() *gorm.DB {
    config, err := loadConfig()
    if err != nil {
        log.Fatalf("Failed to load config: %v", err)
    }

    // If running outside Docker and the host is set to host.docker.internal,
    // replace it with localhost for direct connectivity
    host := config.Host
    if host == "host.docker.internal" {
        // Check if we're running outside Docker
        if _, err := os.Stat("/.dockerenv"); os.IsNotExist(err) {
            host = "localhost"
            log.Println("Running outside Docker, using localhost instead of host.docker.internal")
        }
    }

    log.Printf("Connecting to database %s at %s:%s with user %s", config.DBName, host, config.Port, config.User)

    dsn := "host=" + host + " user=" + config.User + " password=" + config.Password + " dbname=" + config.DBName + " port=" + config.Port
    if config.SSLMode != "" {
        dsn += " sslmode=" + config.SSLMode
    } else {
        dsn += " sslmode=disable"  // Default to disable if not specified
    }
    
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }

    log.Println("Successfully connected to the database")

    // Check if the movies table exists
    if !db.Migrator().HasTable("movies") {
        log.Fatalf("Table 'movies' does not exist in the database")
    } else {
        log.Println("Table 'movies' exists in the database")
    }

    DB = db
    return DB
}