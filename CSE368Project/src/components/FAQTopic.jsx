import React from 'react';
import { Link } from 'react-router-dom';

function FAQTopic({ title, description, predefinedKnowledge }) {
    return (
        <div className="faq-topic-container">
            <h2>{title}</h2>
            <p>{description}</p>
            <Link to="/chat" state={{ predefinedKnowledge }}>
                Chat with GPT about this
            </Link>
        </div>
    );
}

export default FAQTopic;