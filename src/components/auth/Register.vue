<template>
<v-container>
    <div class="header"><h1>Register</h1></div>

    <!-- Register form -->
    <v-form v-model="valid" class="register" @submit.prevent="register">
        <v-container style="padding: 1rem">
            <v-col>

                <!-- Name -->
                <v-row cols="6" md="4" style="margin: 0.5rem">
                    <v-text-field
                    id="name"
                    type="text"
                    v-model="name"
                    label="Name"
                    required
                    ></v-text-field>
                </v-row>

                <!-- Email -->
                <v-row cols="6" md="4" style="margin: 0.5rem">
                    <v-text-field
                    id="email"
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    ></v-text-field>
                </v-row>

                <!-- Password -->
                <v-row cols="6" md="4" style="margin: 0.5rem">
                    <v-text-field
                    id="password"
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 6 characters"
                    counter
                    @click:append="show1 = !show1"
                    ></v-text-field>
                </v-row>

                <!-- Password confirmation -->
                <v-row cols="6" md="4" style="margin: 0.5rem">
                    <v-text-field
                    id="password"
                    v-model="password_confirmation"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 6 characters"
                    counter
                    @click:append="show2 = !show2"
                    ></v-text-field>
                </v-row>

                <!-- Register button -->
                <v-row style="margin: 0.5rem">
                    <v-btn class="ma-2" outlined color="teal" type="submit">
                    Register
                    </v-btn>
                </v-row>
            </v-col>
        </v-container>
    </v-form>
    
</v-container>

</template>


<script>
export default {
data() {
    return {
        valid: false,
        show1: false,
        show2: false,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 6 || 'Min 6 characters',
        },
    };
},
methods: {
    register: function() {
    let data = {
        name: this.name,
        email: this.email,
        password: this.password,
    };
    this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
}
};
</script>