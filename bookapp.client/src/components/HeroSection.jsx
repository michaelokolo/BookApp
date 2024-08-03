import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HeroSection() {
    return (
        <div className="text-center py-5">
            <Container>
                <h1 className="display-4">Welcome to the BookApp</h1>
                <p className="lead">Collect and manage your favorite books.</p>
                <Button as={Link} to="/create-book" variant="primary">Add New Book</Button>
            </Container>
        </div>
  
    
  );
}

export default HeroSection;


