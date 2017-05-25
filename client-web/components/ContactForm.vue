<template>
  <div>
    <div v-if="!contact">Loading...</div>
    <fieldset v-else class="form-group">
      <legend v-if="contact.contactId">Edit Contact</legend>
      <legend v-else>New Contact</legend>
      <form v-on:submit.prevent="onSubmit">
        <div v-bind:class="{ 'has-danger': errors.lastName }" class="form-group">
          <label htmlFor="inputLastName" class="form-control-label">Last Name</label>
          <input type="text" autoFocus name="lastName" id="inputLastName" v-model="contact.lastName" class="form-control form-control-danger" />
          <div class="form-control-feedback">{{ firstError(errors.lastName) }}</div>
        </div>
        <div v-bind:class="{ 'has-danger': errors.firstName }" class="form-group">
          <label htmlFor="inputFirstName" class="form-control-label">First Name</label>
          <input type="text" name="firstName" id="inputFirstName" v-model="contact.firstName" class="form-control form-control-danger" />
          <div class="form-control-feedback">{{ firstError(errors.firstName) }}</div>
        </div>
        <div v-bind:class="{ 'has-danger': errors.email }" class="form-group">
          <label htmlFor="inputEmail" class="form-control-label">Email</label>
          <input type="email" name="email" id="inputEmail" v-model="contact.email" class="form-control form-control-danger" />
          <div class="form-control-feedback">{{ firstError(errors.email) }}</div>
        </div>
        <div v-bind:class="{ 'has-danger': errors.phone }" class="form-group">
          <label htmlFor="inputPhone" class="form-control-label">Phone</label>
          <input type="tel" name="phone" id="inputPhone" v-model="contact.phone" class="form-control form-control-danger" />
          <div class="form-control-feedback">{{ firstError(errors.phone) }}</div>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Save</button>
        <button class="btn btn-lg btn-secondary btn-block" type="button" v-on:click="$router.go(-1)">Cancel</button>
      </form>
    </fieldset>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator'
import ContactService, { IContact } from '../services/Contacts'

@Component
export default class ContactForm extends Vue {
  contact: IContact = null;
  errors: { [key: string]: string } = {};

   created() {
        let contactService = new ContactService();
        if (this.$route.params.id) {
            contactService.fetch(parseInt(this.$route.params.id)).then((response) => {
                this.contact = response.content;
            });
        } else {
            let newContact: IContact = {
                lastName: '', firstName: '', email: '', phone: ''
            };
            this.contact = newContact;
        }
    }

    onSubmit() {
        this.saveContact(this.contact);
    }

    saveContact(contact: IContact) {
        this.errors = {};
        let contactService = new ContactService();
        contactService.save(contact).then((response) => {
            if (!response.is_error) {
                this.$router.go(-1);
            } else {
                this.errors = response.error_content;
            }
        });
    }

   firstError(errors:string[]){
      return errors ? errors[0] : "";
  }
}
</script>
