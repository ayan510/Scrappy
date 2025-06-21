import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default function Mall({ products = [] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
      {products.map((p) => (
        <Card key={p.id}>
          <Image src={p.image} />
          <Card.Content>
            <Card.Header>{p.name}</Card.Header>
            <Card.Meta>{p.price}</Card.Meta>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
