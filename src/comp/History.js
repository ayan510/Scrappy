import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Button,
  Form,
  Segment,
  Header,
  Icon,
  Message,
  Image,
  Container,
  Responsive,
} from 'semantic-ui-react';

const History = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [itemName, setItemName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!name || !phone || !itemName || !image) {
      alert('Please fill all fields and upload an image.');
      return;
    }

    setLoading(true);

    const message = `Hello, I want to sell an item.
Name: ${name}
Phone: ${phone}
Item: ${itemName}`;

    const whatsappLink = `https://wa.me/917337590401?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Details sent successfully! We will contact you soon.');
      window.open(whatsappLink, '_blank');
      setName('');
      setPhone('');
      setItemName('');
      setImage(null);
      setImagePreview(null);
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: '#f4f4f4', padding: '2rem 1rem', minHeight: '100vh' }}>
      <Container text>
        <Segment padded="very" raised>
          <Header as="h2" textAlign="center" color="teal">
            <Icon name="send" /> Send Your Scrap Details
          </Header>

          <Form>
            <Form.Input
              label="Your Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Form.Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <Form.Input
              label="Item Name"
              placeholder="Enter the name of the item"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />

            <Form.Field>
              <label>Upload Image of the Item</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <Image
                  src={imagePreview}
                  size="medium"
                  centered
                  style={{ marginTop: '1rem', borderRadius: '10px' }}
                />
              )}
            </Form.Field>

            <Button
              color="green"
              fluid
              loading={loading}
              onClick={handleSubmit}
              style={{ marginTop: '20px' }}
            >
              <Icon name="whatsapp" /> Send to WhatsApp
            </Button>
          </Form>

          {successMessage && (
            <Message positive style={{ marginTop: '20px' }}>
              <Message.Header>Success</Message.Header>
              <p>{successMessage}</p>
            </Message>
          )}
        </Segment>
      </Container>
    </div>
  );
};

export default History;
