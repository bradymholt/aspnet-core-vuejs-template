<template>
  <div>
    <h1>Contacts</h1>
    <form class="form-inline my-2 my-lg-0" v-on:submit.prevent="onSearch">
      <input class="form-control form-control form-control-sm" type="text" v-model="searchQuery" placeholder="Search" />
      <button class="btn btn-outline-success btn-sm" type="submit">Search</button>&nbsp;
    </form>
    <p v-if="hasNoSearchResults">No results!</p>
    <table v-else class="table">
      <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.contactId">
          <td>{{contact.lastName}}</td>
          <td>{{contact.firstName}}</td>
          <td>{{contact.email}}</td>
          <td>{{contact.phone}}</td>
          <td>
            <router-link class="btn btn-success" :to="{name: 'editContact', params: { id: contact.contactId }}">edit</router-link>
            <button type="button" class="btn btn-link" v-on:click="deleteContact(contact)">delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-primary" v-if="searchQuery" v-on:click="showAll">clear search</button>
    <router-link class="btn btn-success" to="/contacts/new">add</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ContactService, { IContact } from '../services/Contacts';

@Component
export default class Contacts extends Vue {
  contacts: Array<IContact> = [];
  editContact: Object = null;
  isAddMode = false;
  searchQuery: string =  "";

  created(){
    this.showAll();
  }

  showAll() {
    let contactService = new ContactService();
        contactService.fetchAll().then((response) => {
          this.searchQuery = '';
          this.contacts = response.content;
        });
    }

    onSearch() {
      let contactService = new ContactService();
        contactService.search(this.searchQuery).then((response) => {
          this.contacts = response.content;
        });
    }

    deleteContact(contact: IContact) {
      let contactService = new ContactService();
        contactService.delete(contact.contactId).then((response) => {
            let updatedContacts = this.contacts;
            updatedContacts.splice(updatedContacts.indexOf(contact), 1);
            this.contacts = updatedContacts;
        });
    }

    get hasNoSearchResults() {
     return this.searchQuery && this.contacts && this.contacts.length == 0;
  }

}
</script>

<style scoped lang="stylus">
</style>
