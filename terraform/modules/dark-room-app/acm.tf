# SSL Certificate
resource "aws_acm_certificate" "ssl_certificate" {
  domain_name               = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method         = "EMAIL"
}

# after running terraform apply
# one might need to visit ACM certificates page https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/certificates/list
# find the domain's certificate
# click into it and press the button, send verification email
resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn = aws_acm_certificate.ssl_certificate.arn
}
