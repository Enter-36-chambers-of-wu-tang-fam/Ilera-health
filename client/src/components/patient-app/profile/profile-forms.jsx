import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// Components
import BackgroundInfoFormInitialized from '../../../containers/forms/basic-form-initialized.js';
import ContactInfoFormInitialized from '../../../containers/forms/contact-form-initialized.js';
import HealthInfoFormInitialized from '../../../containers/forms/health-form-initialized.js';
import ProviderInfoFormInitialized from '../../../containers/forms/provider-form-initialized.js';

import ProfileDash from './profile-board.js';

const styles = {
  tab: {
    backgroundColor: '#0D2233'
  },
};

class ProfileForms extends Component {

    constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
			<div className="profileForms">
				<ProfileDash />
				<Tabs
					value={this.state.value}
					
				>
					<Tab onClick={this.handleChange.bind(this, 'a')} label="Basic User Info" style={styles.tab} value="a" >
						<div>
							<BackgroundInfoFormInitialized />
						</div>
					</Tab>
					<Tab onClick={this.handleChange.bind(this, 'b')} label="Contact Info" style={styles.tab} value="b" >
						<div>	
							<ContactInfoFormInitialized />
						</div>
					</Tab>
					<Tab onClick={this.handleChange.bind(this, 'c')} label="Health Info" style={styles.tab} value="c" >
						<div>
							<HealthInfoFormInitialized />
						</div>
					</Tab>
					<Tab onClick={this.handleChange.bind(this, 'd')} label="Provider Info" style={styles.tab} value="d">
						<div>
							<ProviderInfoFormInitialized />
						</div>
					</Tab>
				</Tabs>
			</div>
    );
  }
};

export default ProfileForms;