
resource "aws_sqs_queue_policy" "image_changes_queue_policy" {
    queue_url = "${resource.aws_sqs_queue.image_changes_queue.id}"


    policy = <<POLICY
    {
      "Version": "2012-10-17",
      "Id": "sqspolicy",
      "Statement": [
        {
          "Sid": "First",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "sqs:SendMessage",
          "Resource": "${resource.aws_sqs_queue.image_changes_queue.arn}",
          "Condition": {
            "ArnEquals": {
              "aws:SourceArn": "${resource.aws_sns_topic.image_changes_topic.arn}"
            }
          }
        }
      ]
    }
    POLICY
}

