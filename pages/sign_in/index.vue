<script lang="ts" setup></script>

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
                  <v-text-field label="Email" variant="outlined" hide-details />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password"
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
                  <v-btn color="primary" block>Sign In</v-btn>
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
