package requestResponseModels

type PrefillSeatsPayload struct {
    ShowID      int      `json:"show_id"`
    Rows        []string `json:"rows"`
}