import React, { Component } from 'react'
import './Contact.css'

export default class Contact extends Component {

    handleFormSubmit = (e) => {
        e.preventDefault()
        // TODO: connect this sucker to nodemailer 
    }

    render() {
        return (
            <div className='contact-container'>
                <div className='contact-info'>
                    <div className='contact-headers-container'>
                        <h2 className='contact-header'>Connect with us!!!!!</h2>
                        <h3 className='contact-subheader'>We would love to hear your feedback </h3>
                    </div>
                    <form id='contactForm' className='contact-form'>
                        <div className='form-row'>
                            <input
                                className='contact-form-input'
                                id='nameInput'
                                type='text'
                                required
                                placeholder='Name'
                            />
                            <input
                                className='contact-form-input'
                                id='emailInput'
                                type='email'
                                required
                                placeholder='Email'
                            />
                        </div>
                        <div className='form-row'>
                            <input
                                className='contact-form-input'
                                id='subjectInput'
                                type='text'
                                required
                                placeholder='Subject'
                            />
                        </div>
                        <div className='form-row contact-message-container'>
                            <input
                                className='contact-form-input'
                                id='messageInput'
                                type='textarea'
                                required
                                placeholder='Message'
                            />
                        </div>
                        <div className='contact-button-container'>
                          <button
                              className='tbt-button'
                              type='submit'
                              id='contactFormButton'
                              onClick={(e) => this.handleFormSubmit(e)}
                          >
                            SEND
                          </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}