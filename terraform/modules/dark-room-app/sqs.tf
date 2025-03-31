resource "aws_sqs_queue" "image_changes_queue" {
  name = var.image_changes_queue_name
}

resource "aws_sqs_queue" "image_reducer_lambda_dlq" {
  name = var.image_reducer_lambda_dlq_name
  # Add other SQS queue configurations as needed (e.g., encryption, FIFO)
}
