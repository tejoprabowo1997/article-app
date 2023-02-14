<script lang="ts" setup>
import { Ref } from 'vue'
import { H3Error } from 'h3'

const isLogin = useState('isLogin')
const token = useCookie('token')
const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')

const inputValidation = () => {
  let error: boolean = false

  if (!email.value) {
    alert('Email cannot be empty')
    error = true
  }
  if (!password.value) {
    alert('Password cannot be empty')
    error = true
  }

  return error
}

const signIn = async () => {
  const errInput = inputValidation()
  if (errInput) return

  interface IDataLogin {
    email: string
    password: string
  }
  interface IResponse {
    data: Ref<string | null>
    error: Ref<H3Error | null>
  }
  const dataLogin: IDataLogin = {
    email: email.value,
    password: password.value,
  }
  const { data, error }: IResponse = await useLazyFetch('/api/sign_in', {
    method: 'post',
    body: dataLogin,
  })

  if (data.value) {
    token.value = data.value
    isLogin.value = true
    router.push({ path: '/' })
  }
  if (error.value) {
    alert(error.value.data.message)
  }
}
</script>

<template>
  <v-container>
    <v-row align="center" no-gutters class="h-screen" justify="center">
      <v-col cols="12" xl="6" lg="6" md="10" sm="12" xs="12">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title> Sign In Article App </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="=12">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    variant="outlined"
                    hide-details
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    hide-details
                  />
                </v-col>
                <v-col cols="6" align-self="center">
                  <v-switch
                    label="Remember me"
                    density="compact"
                    hide-details
                  />
                </v-col>
                <v-col cols="6" align-self="center" align="end">
                  <v-btn variant="plain" style="text-transform: none">
                    Forgot Password?
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-container fluid>
              <v-row>
                <v-col col="6">
                  <v-btn to="/sign_up" color="warning" block>Sign Up</v-btn>
                </v-col>
                <v-col col="6">
                  <v-btn color="primary" block @click="signIn">Sign In</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
