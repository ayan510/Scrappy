import React, { useContext, useState } from 'react';
import { MyContext } from '../App';
import { Button, Card, Icon, Image, Modal, Form, Input } from 'semantic-ui-react';

export default function Products({ products, setProducts }) {
  const { user, admins } = useContext(MyContext);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  const isAdmin = user && admins.includes(user.email);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setNewPrice(product.price.replace('₹', ''));
    setEditModalOpen(true);
  };

  const handleSavePrice = () => {
    const updated = products.map(p => p.id === selectedProduct.id ? { ...p, price: `₹${newPrice}` } : p);
    setProducts(updated);
    setEditModalOpen(false);
  };

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {products.map((p) => (
          <Card key={p.id}>
            <Image src={p.image} />
            <Card.Content>
              <Card.Header>{p.name}</Card.Header>
              <Card.Meta>{p.price}</Card.Meta>
              {isAdmin && (
                <Button icon onClick={() => openEditModal(p)} style={{ marginTop: '10px' }}>
                  <Icon name='edit' />
                </Button>
              )}
            </Card.Content>
          </Card>
        ))}
      </div>

      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)} size='tiny'>
        <Modal.Header>Edit Price</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>New Price (₹)</label>
              <Input type='number' value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button color='green' onClick={handleSavePrice}>Save</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}  