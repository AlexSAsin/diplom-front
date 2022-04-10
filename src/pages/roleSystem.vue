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
          <v-divider></v-divider>

          <h2 class="text-left pb-5 pt-3">
            Реализация со стороны базы данных:
          </h2>

          <v-flex d-flex>
            <p class="text-left pl-5 pr-10 pt-13">
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
          <v-divider></v-divider>

          <h2 class="text-left pb-5 pt-3">Реализация со стороны сервера:</h2>

          <v-flex d-flex>
            <div>
              <p class="text-left pl-5 pt-15">
                Рассмотрим код представленный на картинке справа:
              </p>
              <p class="text-left pl-7">
                &#9312; - Получение url вызываемого API и ID текущего
                пользователя.
              </p>
              <p class="text-left pl-7">
                &#9313; - Получение массива доступных API для роли к которой
                относится текущий пользователь.
              </p>
              <p class="text-left pl-7">
                &#9314; - Проверка наличия в массиве доступных API вызываемого
                API. Если совпадение найдено, то у текущего пользователя есть
                доступ.
              </p>
              <p class="text-left pl-7">
                &#9315; - Если совпадений не найдено, то текущего пользователя
                нет доступа. Возвращаем статус ошибки 403 и сообщение об ошибке
                доступа.
              </p>
            </div>
            <img class="image-style-code" src="../assets/role_code.png" />
          </v-flex>
          <v-divider></v-divider>
          <h2 class="text-left pb-5 pt-3">
            Наглядное представление работы API:
          </h2>
          <v-flex d-flex md12>
            <p class="text-left pl-5 pb-10">
              В качестве параметров передаем ID пользователя. Пользователю с ID
              = 2, доступны следующие API: "/getTest" и "/upload", пользователю
              с ID = 3 "/getName" и "/getData"
            </p>
          </v-flex>
          <v-container>
            <v-row class="mx-auto">
              <v-card class="mx-auto" max-width="300">
                <v-card-text class="text--primary">
                  <div>
                    <v-text-field v-model="userID1" label="USER ID"></v-text-field>
                    <v-text-field readonly label="API" value="/getTest"></v-text-field>
                  </div>
                  <div>{{ responce1 }}</div>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn elevation="7" color="orange" text @click="callgetTest">
                    CALL API
                  </v-btn>
                </v-card-actions>
              </v-card>

              <v-card class="mx-auto" max-width="300">
                <v-card-text class="text--primary">
                  <div>
                    <v-text-field v-model="userID2" label="USER ID"></v-text-field>
                    <v-text-field  readonly label="API" value="/getName"></v-text-field>
                  </div>
                  <div>{{ responce2 }}</div>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn elevation="7" color="orange" text @click="callgetName">
                    CALL API
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-container>
        </v-card-text>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      snackbar: false,
      responce1: {
        statusCode: "",
        local: "",
        avaibleApi: "",
      },
      responce2: {
        statusCode: "",
        local: "",
        avaibleApi: "",
      },
      userID1: '',
      userID2: '',
    };
  },

  methods: {
    async callgetTest() {
      const res = await this.$axios.$post("getTest", {
        user_id: this.userID1,
      });
      this.responce1 = res;
      if (res) {
        this.snackbar = true;
        console.log(res);
      }
    },
    async callgetName() {
      const res = await this.$axios.$post("getName", {
        user_id: this.userID2,
      });
      this.responce2 = res;
      if (res) {
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
.image-style-code {
  width: 780px !important;
  height: 520px !important;
  margin-left: 100px;
}
</style>
