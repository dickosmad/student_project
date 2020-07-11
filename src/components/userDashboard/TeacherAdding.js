import React, { Component } from 'react'
import { Menu, Icon ,Modal , Form,Input,Button  } from 'semantic-ui-react'
import firebase from '../../firebase'

export default class Channels extends Component {
    state = {
        channels:[] , 
        modal:false,
        TeacherName:'',
        TeacherDetails:'',
        user : this.props.user,
        TeacherRef: firebase.database().ref('teacher')
    }

    handleSubmit =  event =>{
        event.preventDefault();
        if(this.isFormValid(this.state)){
            this.addChannel()
        }
    }

    addChannel = () =>{
        const {TeacherRef , TeacherName , TeacherDetails ,user } = this.state ;
        console.log(user) 
        const key = user.user.uid;
        const newTeacher = {
            id:key,
            name:TeacherName ,
            details:TeacherDetails 
           
        };

        TeacherRef
        .child(key)
        .update(newTeacher)
        .then(() =>{
            this.setState({
                TeacherName:'',
                TeacherDetails:''
            });
            this.closeModal();
            console.log('channel created')
        })
        .catch(err => console.error(err))

    }

    handleChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }

    isFormValid = ({TeacherDetails,TeacherName}) => TeacherDetails && TeacherName


    closeModal = () => this.setState({ modal:false})
    openModal = () => this.setState({ modal:true})

    render() {
        const { channels  , modal } = this.state 
        return (
        <React.Fragment>
            <Menu.Menu style={{paddingBottom:'2em'}} >
                <Menu.Item>
                    <span>{ " "}
                        <Icon name="exchange" icon="" />CHANNELS
                    </span>
                    ({channels.length}) <Icon name="add" onClick={this.openModal}/>
                </Menu.Item>
            </Menu.Menu>

            <Modal basic open={modal} onClose={this.closeModal}  >
                <Modal.Header>Add Teacher</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Field>
                          <Input 
                          fluid
                          label="Name of channel"
                          name = "TeacherName"
                          onChange={this.handleChange}
                          />
                      </Form.Field>  
                      <Form.Field>
                          <Input 
                          fluid
                          label="About The Channel"
                          name = "TeacherDetails"
                          onChange={this.handleChange}
                          />
                      </Form.Field>  

                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button color="green" inverted  onClick={this.handleSubmit} >
                        <Icon name="checkmark"/>Add
                    </Button>
                    <Button color="red" inverted onClick={this.closeModal} >
                        <Icon name="checkmark"/>Cancel
                    </Button>
                </Modal.Actions>

            </Modal>
        </React.Fragment>
        )
    }
}
