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

Updated to return a task_id for progress tracking.

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
  "historic": [
    {
      "mes": "01",
      "ano": "2024",
      "consumption": 1500
    }
  ]
}
```

## Implementation Notes

The frontend will:
1. Submit the form to `/upload/`
2. Receive a `task_id` in response
3. Poll `/progress/{task_id}` every second until progress reaches 100%
4. Display real-time progress with a progress bar

The backend should:
1. Generate a unique task_id when processing starts
2. Store progress information that can be retrieved via the task_id
3. Update progress as pages are processed
4. Return final results when processing is complete