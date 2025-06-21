import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Segment, Header, Icon, Message, Image } from 'semantic-ui-react';

const History = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [itemName, setItemName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!name || !phone || !itemName || !image) {
      alert('Please fill all fields and upload an image.');
      return;
    }

    setLoading(true);

    // Create WhatsApp message with details
    const message = `Hello, I want to sell an item.
Name: ${name}
Phone: ${phone}
Item: ${itemName}`;

    // Create a WhatsApp link
    const whatsappLink = `https://wa.me/917337590401?text=${encodeURIComponent(message)}`;

    // Simulate sending data (image upload can't be sent through WhatsApp link directly)
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Details sent successfully! We will contact you soon.');
      window.open(whatsappLink, '_blank');  // Open WhatsApp chat
      setName('');
      setPhone('');
      setItemName('');
      setImage(null);
      setImagePreview(null);
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: '#f4f4f4', padding: '40px', minHeight: '100vh' }}>
      <Segment padded='very' raised>
        <Header as='h2' textAlign='center' color='teal'>
          <Icon name="send" /> Send Your Scrap Details
        </Header>

        <Form>
          <Form.Input
            label='Your Name'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Form.Input
            label='Phone Number'
            placeholder='Enter your phone number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <Form.Input
            label='Item Name'
            placeholder='Enter the name of the item'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />

          <Form.Field>
            <label>Upload Image of the Item</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <Image src={imagePreview} size='small' style={{ marginTop: '10px' }} />
            )}
          </Form.Field>

          <Button
            color='green'
            fluid
            loading={loading}
            onClick={handleSubmit}
            style={{ marginTop: '20px' }}
          >
            <Icon name="whatsapp" /> Send to WhatsApp
          </Button>
        </Form>

        {successMessage && (
          <Message positive>
            <Message.Header>Success</Message.Header>
            <p>{successMessage}</p>
          </Message>
        )}
      </Segment>
    </div>
  );
};

export default History;
