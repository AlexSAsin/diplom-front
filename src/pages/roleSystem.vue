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
            <div>
              <p class="text-left pl-5 pr-10">
                В базе данных присутствуют три основные сущности:
              </p>
              <p class="text-left pl-8 pr-10">
                &#9312; - таблица "users" отвечает за информацию о
                пользователях;
              </p>
              <p class="text-left pl-8 pr-10">
                &#9313; - таблица "role" содержит список ролей;
              </p>
              <p class="text-left pl-8 pr-10">
                &#9314; - таблица "apiList" содержит список API.
              </p>
              <p class="text-left pl-5 pr-10">
                Теперь рассмотрим их связи: у одного пользователя может быть
                множество ролей, но и у одной роли может быть множество
                пользователй, так-же у одной роли может быть множество API, но и
                у одного API может быть несколько ролей.
              </p>
              <p class="text-left pl-5 pr-10">
                Такой тип отношения называется ManyToMany (многие ко многим) и в
                рамках реляционной теории описывается связующей таблицей с
                внешними ключами (для ограничения целостности данных). Такими
                связующими таблицами являются: "users_to_role" и "role_apiList"
              </p>
            </div>
            <img class="image-style" src="../assets/role.png" />
          </v-flex>
          <v-divider></v-divider>

          <h2 class="text-left pb-5 pt-3">Реализация со стороны сервера:</h2>

          <v-flex d-flex>
            <div>
              <p class="text-left pl-5 pt-7">
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
                доступ и исполняется выбранная функция API, на рисунке этот
                вызов проиллюстрирован строкой res.send(true)
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
                  <h3 class="text-center pb-5">correct API</h3>
                  <div>
                    <v-select
                      class="mt-4"
                      :items="usersIds"
                      v-model="userID1"
                      label="USER ID"
                    ></v-select>
                    <v-text-field
                      readonly
                      label="API"
                      value="/getTest"
                    ></v-text-field>
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
                  <h3 class="text-center pb-5">incorrect API</h3>
                  <div>
                    <v-select
                      class="mt-4"
                      :items="usersIds"
                      v-model="userID2"
                      label="USER ID"
                    ></v-select>
                    <v-text-field
                      readonly
                      label="API"
                      value="/getName"
                    ></v-text-field>
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
          <v-flex d-flex mt-5>
            <div>
              <p class="text-left pl-7 mt-5">
                Как мы можем заметить когда мы вызывали некорректный API в обоих
                случаях вернулось true, что соответствует об успешном доступе. А
                при вызове корректного с ID=3 нарушения доступа не произошло и в
                качестве ответа вернулись: ошибка, статус и список доступных
                API.
              </p>
            </div>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-container>
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
      userID1: "",
      userID2: "",
      usersIds: [2, 3],
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
        user_id: 3,
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
.image-style {
  width: 450px !important;
  height: 470px !important;
  margin-right: 300px;
  margin-left: 100px;
}
.image-style-code {
  width: 680px !important;
  height: 420px !important;
  margin-left: 100px;
  margin-right: 70px;
}
</style>
