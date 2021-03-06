import React, { Component } from 'react';

class SMSForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          message: {
            to: '',
            body: ''
          },
          submitting: false,
          error: false
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

      onHandleChange(event) {
        const name = event.target.getAttribute('name');
        this.setState({
          message: { ...this.state.message, [name]: event.target.value }
        });
      }

      onSubmit(event) {
        event.preventDefault();
        this.setState({ submitting: true });
        fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.message)
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              this.setState({
                error: false,
                submitting: false,
                message: {
                  to: '',
                  body: ''
                }
              });
            } else {
              this.setState({
                error: true,
                submitting: false
              });
            }
          });
      }

      render() {
        return (
          <form
            onSubmit={this.onSubmit}
            className={this.state.error ? 'error sms-form' : 'sms-form'}
          >
                     
            <button type="submit" disabled={this.state.submitting}>
              Send message
            </button>
           </form>
        );
      }
}



export default SMSForm;