<!--<template>
<div>
    <form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>Email</label>
    <input required v-model="email" type="email" placeholder="Name"/>
    <label>Password</label>
    <input required v-model="password" type="password" placeholder="Password"/>
    <hr/>
    <button type="submit">Login</button>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
        email: "",
        password: ""
        };
},
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
};
</script>
-->


<template>
  <v-form v-model="valid" class="login" @submit.prevent="login">
    <v-container style="padding: 1rem">
      <v-col>
        <v-row
          cols="6"
          md="4"
          style="margin: 0.5rem"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-row>

        <v-row
          cols="6"
          md="4"
          style="margin: 0.5rem"
        >
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

        <v-row style="margin: 0.5rem">
            <v-btn
            class="ma-2"
            outlined
            color="teal"
            type="submit"
            >
            Login
            </v-btn>
        </v-row>
      </v-col>
    </v-container>
    
  </v-form>
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