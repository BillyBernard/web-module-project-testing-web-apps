import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const formHeader = screen.queryByText(/contact form/i);

    expect(formHeader).toBeTruthy();
    expect(formHeader).toHaveTextContent(/contact form/i);
    expect(formHeader).toBeInTheDocument();
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const fNameInput = screen.getByPlaceholderText(/edd/i);
    userEvent.type(fNameInput, 'Bill');
    const errorFeedback = await screen.findByText(/Error: firstName must have at least 5 characters./i);
    expect(errorFeedback).toBeInTheDocument();

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorFeedback1 = await screen.findByText(/Error: firstName must have at least 5 characters./i);

    const errorFeedback2 = await screen.findByText(/Error: lastName is a required field/i);

    const errorFeedback3 = await screen.findByText(/Error: email must be a valid email address./i);

    expect(errorFeedback1).toBeInTheDocument();
    expect(errorFeedback2).toBeInTheDocument();
    expect(errorFeedback3).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const fNameInput = screen.getByPlaceholderText("Edd");
    
    userEvent.type(fNameInput, 'Billy');

    const lNameInput = screen.getByPlaceholderText("Burke");
    
    userEvent.type(lNameInput, 'Paris');

    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorFeedback = await screen.findByText(/Error: email must be a valid email address./i);
    expect(errorFeedback).toBeInTheDocument();
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    

    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(emailInput, 'Billy.com');


    const errorFeedback = await screen.findByText(/Error: email must be a valid email address./i);
    expect(errorFeedback).toBeInTheDocument();
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const fNameInput = screen.getByPlaceholderText("Edd");
    userEvent.type(fNameInput, 'Billy');

    const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com");
    userEvent.type(emailInput, 'billybernard54@gmail.com');

    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorFeedback = await screen.findByText(/Error: lastName is a required field/i);
    expect(errorFeedback).toBeInTheDocument();
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const fNameInput = screen.getByPlaceholderText("Edd");
    userEvent.type(fNameInput, 'Billy');

    const lNameInput = screen.getByPlaceholderText("Burke");
    userEvent.type(lNameInput, 'Paris');

    const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com");
    userEvent.type(emailInput, 'billybernard54@gmail.com');

    const button = screen.getByRole('button');
    userEvent.click(button);

    const fNameFeedback = await screen.findByText("Billy");
    expect(fNameFeedback).toBeInTheDocument();

    const lNameFeedback = await screen.findByText("Paris");
    expect(lNameFeedback).toBeInTheDocument();

    const emailFeedback = await screen.findByText("billybernard54@gmail.com");
    expect(emailFeedback).toBeInTheDocument();

    const messageInput = screen.queryByText(/message/i);
    expect(messageInput).not.toBeInDocument();

    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const fNameInput = screen.getByPlaceholderText("Edd");
    userEvent.type(fNameInput, 'Billy');

    const lNameInput = screen.getByPlaceholderText("Burke");
    userEvent.type(lNameInput, 'Paris');

    const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com");
    userEvent.type(emailInput, 'billybernard54@gmail.com');

    const messageInput = screen.queryByLabelText(/message/i);
    userEvent.type(messageInput, 'hello my name is');

    const button = screen.getByRole('button');
    userEvent.click(button);

    const fNameFeedback = await screen.findByText("Billy");
    expect(fNameFeedback).toBeInTheDocument();

    const lNameFeedback = await screen.findByText("Paris");
    expect(lNameFeedback).toBeInTheDocument();

    const emailFeedback = await screen.findByText("billybernard54@gmail.com");
    expect(emailFeedback).toBeInTheDocument();

    const messageFeedback = await screen.findByText("hello");
    expect(messageFeedback).toBeInTheDocument();



});