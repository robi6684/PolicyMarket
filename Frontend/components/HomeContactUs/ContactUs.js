import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    
      const handleQueryChange = (event) => {
        setQuery(event.target.value);
      };
    

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Email:', email);
    console.log('Query:', query);
  };

  return (
    <>  
    <h2 > Contact Us</h2>
    <div className="contact-us-container">
            <div className="contact-details">
        <div className="contact-section">
          <h2>Contact Numbers:</h2>
          <p><strong>Main Office:</strong> +917889557689</p>
          <p><strong>Toll Free:</strong> +918866784322</p>
        </div>
        <div className="contact-section">
          <h2><strong>Email:</strong></h2>
          <p>ritiksaxena037@gmail.com</p>
          <p>robi6684v@gmail.com</p>
          
        </div>
        <div className="contact-section">
          <h2>Our Offices:</h2>
          <p> <strong>Main Office:</strong> Sector 43, Gurgaon,Haryana,India</p>
          <p><strong>Branch Office:</strong> 5678 Oak Avenue, Delhi,India</p>
        </div>
      </div>
      <div className="query-form">
      <h2 className="heading">Your Query!</h2>
      <form >
        <div className="form-group">
          {/* <label>Your Email</label> */}
          <input
            type="email"
            value={email}
            placeholder="Your Email"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          {/* <label>Your Query</label> */}
          <textarea
            value={query}
            placeholder="Your Query"
            onChange={handleQueryChange}
            rows="6"
            required
          />
        </div>
        
        <button className ="button"type="submit" onClick={handleSubmit}>Send Query</button>
      </form>
    </div>
    </div>
     </>
  );
};

export default ContactUs;
