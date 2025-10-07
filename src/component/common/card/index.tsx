import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CardProps } from "./card.type";
import { Badge } from "react-bootstrap";

function CardKit(props: CardProps) {
  const { title, price, content, buttonText, imgSrc, userNumber } = props;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imgSrc} />
      <Card.Body>
        <Badge bg="secondary">{userNumber}</Badge>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
        <Card.Text>{price}</Card.Text>
        <Button variant="primary">{buttonText}</Button>
      </Card.Body>
    </Card>
  );
}

export default CardKit;
