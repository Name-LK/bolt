# Backend Endpoints Documentation

## Progress Tracking Endpoint

### GET /progress/{task_id}

Returns the current processing progress for a given task.

**Response Format:**
```json
{
  "progress": 75.5,
  "current_page": 3,
  "total_pages": 4,
  "status": "Processando página 3 de 4..."
}
```

**Fields:**
- `progress` (number): Percentage of completion (0-100)
- `current_page` (number, optional): Current page being processed
- `total_pages` (number, optional): Total number of pages in the document
- `status` (string, optional): Current processing status message

### POST /upload/

Updated to return a task_id for progress tracking and valor_cobranca_indevida.

**Updated Response Format:**
```json
{
  "task_id": "uuid-string-here",
  "message": "Processing started",
  "extracted_icms_data": {
    "icms": {
      "baseCalculo": "1234.56",
      "percentual": "18.00",
      "valorImposto": "222.22"
    }
  },
  "economia_potencial": 8.66,
  "valor_cobranca_indevida": 150.75,
  "historic": [
    {
      "mes": "01",
      "ano": "2024",
      "consumption": 1500
    }
  ]
}
```

**Key Fields:**
- `valor_cobranca_indevida` (number): The main value to be displayed on results screen - represents the improper billing amount that can be recovered

## Implementation Notes

The frontend will:
1. Submit the form to `/upload/`
2. Receive a `task_id` in response
3. Poll `/progress/{task_id}` every second until progress reaches 100%
4. Display real-time progress with a progress bar
5. Show the `valor_cobranca_indevida` as the main result

The backend should:
1. Generate a unique task_id when processing starts
2. Store progress information that can be retrieved via the task_id
3. Update progress as pages are processed
4. Calculate and return `valor_cobranca_indevida` as the primary result
5. Return final results when processing is complete