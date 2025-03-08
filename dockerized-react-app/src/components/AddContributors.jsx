import React from 'react'

function AddContributors({refetechUsers}) {


  const [isOpen, setIsOpen] = React.useState(false);

  const [formState, setFormState] = React.useState({
    name: '',
    email: ''
  });

  const submitForm = async () => { 
    try {
    await fetch('/api/contributor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    });
    refetechUsers();
    setIsOpen(false);
    setFormState({name: '', email: ''})
    }
    catch (error) {
      console.error(error);
    }
  }

  const onHandleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  }

  const onClose = () => setIsOpen(false);

  return (
    <div>
        <button onClick={() => setIsOpen(true)} className='add-contributors'>
            Add Contributors
        </button>
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className={`modal-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className='close-button' onClick={onClose}>X</div>
            <h2 className='heading'>Add Contributor Modal</h2>
            <div className='form-container'>
                <label className='form-label'>Name</label>
                <input className='input-field' name='name' value={formState.name} onChange={onHandleChange} />
                <label className='form-label'>Email</label>
                <input className='input-field-last-child' name='email' value={formState.email} onChange={onHandleChange}/>
                <button onClick={submitForm}>Submit</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AddContributors