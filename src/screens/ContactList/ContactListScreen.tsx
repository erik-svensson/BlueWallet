import React, { PureComponent } from 'react';
import { StatusBar } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';

import { ListEmptyState, SearchBar } from 'app/components';
import { Route, Contact } from 'app/consts';
import { ApplicationState } from 'app/state';

import { ContactList } from './ContactList';
import { ContactListHeader } from './ContactListHeader';

const i18n = require('../../../loc');

interface Props extends NavigationInjectedProps {
  contacts: Contact[];
}

interface State {
  query: string;
}

export class ContactListScreen extends PureComponent<Props, State> {
  static navigationOptions = () => {
    return {
      header: null,
      tabBarLabel: i18n.contactList.bottomNavigationLabel,
    };
  };

  state: State = {
    query: '',
  };

  navigateToAddContact = () => this.props.navigation.navigate(Route.CreateContact);

  navigateToContactDetails = (contact: Contact) => {
    const { navigation, route } = this.props;
    if (route?.onContactPress) {
      route.onContactPress(contact.address);
      return navigation.goBack();
    }
    navigation.navigate(Route.ContactDetails, { contact });
  };

  setQuery = (query: string) => this.setState({ query });

  get filteredContacts(): Contact[] {
    return this.props.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.query.toLowerCase()));
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { navigation, contacts, route } = this.props;
    return (
      <>
        <StatusBar barStyle="light-content" />
        <ContactListHeader
          onAddButtonPress={!route?.onContactPress ? this.navigateToAddContact : undefined}
          onBackArrowPress={route?.onContactPress && this.goBack}
          title={route?.title}
        >
          <SearchBar query={this.state.query} setQuery={this.setQuery} />
        </ContactListHeader>
        {contacts && contacts.length ? (
          <ContactList
            query={this.state.query}
            contacts={this.filteredContacts}
            navigateToContactDetails={this.navigateToContactDetails}
          />
        ) : (
          <ListEmptyState variant={ListEmptyState.Variant.ContactList} onPress={this.navigateToAddContact} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  contacts: Object.values(state.contacts.contacts),
});

export default connect(mapStateToProps)(ContactListScreen);
