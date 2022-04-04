<template>
  <div>
    <v-toolbar color="amber lighten-1" dense elevation="6">
      <v-col class="d-flex justify-space-around">
        <v-toolbar-title class="font-weight-medium display-1"
          >Ролевая система</v-toolbar-title
        >
      </v-col>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-card>
        <v-card-text class="title">
          <h2 class="text-left pb-5">Что это такое и зачем это нужно?</h2>
          <v-flex d-flex md12>
            <p class="text-left pl-5 pb-15">
              В архитектуре "клиент-сервер" на стороне сервера содержатся API
              (Application Programming Interface). Каждый из API выполняет
              отдельную функцию, поэтому доступ к ним должен быть разграничен.
              Концепция ролевой системы заключается в том, что при вызове API
              происходит проверка на наличие доступа к этому API у данного
              пользователя.
            </p>
          </v-flex>

          <h2 class="text-left pb-5">Реализация со стороны базы данных:</h2>

          <v-flex d-flex>
            <p class="text-left pl-5 pr-10">
              В базе данных присутствуют три основные сущности: таблица &#9312;
              "users" отвечает за информацию о пользователях, таблица &#9313;
              "role" содержит список ролей и таблица &#9314; "apiList" содержит
              список API. Теперь рассмотрим их связи: у одного пользователя
              может быть множество ролей, но и у одной роли может быть множество
              пользователй, так-же у одной роли может быть множество API, но и у
              одного API может быть несколько ролей. Такой тип отношения
              называется ManyToMany (многие ко многим) и в рамках реляционной
              теории описывается связующей таблицей с внешними ключами (для
              ограничения целостности данных). Такими связующими таблицами
              являются: "users_to_role" и "role_apiList"
            </p>
            <img class="image-style" src="../assets/role.png" />
          </v-flex>

          <h2 class="text-left pb-5">Реализация со стороны сервера:</h2>

          <v-flex d-flex>
            <p class="text-left pl-5 pr-10"></p>
            <img class="image-style" src="../assets/role.png" />
          </v-flex>
        </v-card-text>

        <v-divider></v-divider>

        <v-container class="spacing-playground pa-5" fluid>
          <v-row class="mx-auto">
            <v-card class="mx-auto" max-width="600">
              <v-card-text class="text--primary">
                <div>USER ID : 3</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="orange" text @click="sendReq"> SEND REQ </v-btn>
              </v-card-actions>
            </v-card>

            <v-card class="mx-auto" max-width="600">
              <v-card-text class="text--primary">
                <div>USER ID : 3</div>
                <div>API URL : '/getSomeShit'</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="orange" text> SEND REQ </v-btn>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
    <v-snackbar v-model="snackbar">
      success
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- <v-card-text class="text-left pl-10">
        Что это такое и зачем это нужно?\n
      </v-card-text> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      snackbar: false,
    };
  },

  methods: {
    async sendReq() {
      const res = await this.$axios.$post("getAviableApi", {
        user_id: 3
      });
      if (res){
        this.snackbar = true;
        console.log(res);
      }
    },
  },
};
</script>
<style>
/*.v-list-group .v-list-item .v-list-item {*/
/*padding: 0;*/
/*}*/
.image-style {
  width: 450px !important;
  height: 470px !important;
  margin-right: 300px;
  margin-left: 100px;
}
</style>
