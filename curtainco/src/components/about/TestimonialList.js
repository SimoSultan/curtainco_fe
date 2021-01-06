import React from 'react';
import TestimonialItem from './TestimonialItem';

function TestimonialList({ testimonials }) {
    const testimonialList = testimonials.map((t) => (
        <TestimonialItem msg={t.msg} key={t.id} />
    ));
    return testimonialList;
}

export default TestimonialList;
