<template>
  <v-container class="main">

    <div class="header"><h1>Login</h1></div>
    
    <!-- Login form -->
    <v-form v-model="valid" class="login" @submit.prevent="login">
      <v-container style="padding: 1rem">
        <v-col>
          
          <!-- Email -->
          <v-row cols="6" md="4" style="margin: 0.5rem">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-row>

          <!-- Password -->
          <v-row cols="6" md="4" style="margin: 0.5rem">
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 6 characters"
              counter
              @click:append="show = !show"
            ></v-text-field>
          </v-row>

          <!-- Login button -->
          <v-row style="margin: 0.5rem">
              <v-btn class="ma-2" outlined color="teal" type="submit">
              Login
              </v-btn>
          </v-row>

        </v-col>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      show: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 6 || 'Min 6 characters',
        },
    }),

    methods: {
    login: function() {
    let email = this.email;
    let password = this.password;
    this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
        }
    }
}
</script>
