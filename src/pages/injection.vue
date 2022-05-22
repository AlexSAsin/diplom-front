<template>
  <div>
    <v-toolbar color="amber lighten-1" dense elevation="6">
      <v-col class="d-flex justify-space-around">
        <v-toolbar-title class="font-weight-medium display-1"
          >SQL инъекции</v-toolbar-title
        >
      </v-col>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-card>
        <v-card-text class="title">
          <h2 class="text-left pb-5">Теоретическая справка</h2>
          <v-flex d-flex>
            <div>
              <p class="text-left pl-5">
                SQL инъекция — это уязвимость веб-сервиса, которая позволяет
                злоумышленнику вмешиваться в запросы к базе данных. Как правило,
                это позволяет злоумышленнику просматривать или изменять данные,
                которые не должны быть доступны для него. Доступ к таким данным
                должна иметь только серверная часть приложения. Таким образом
                SQL инъекции могут привести к несанкционированному изменению
                поведения приложения или содержимого базы данных.
              </p>
              <p class="text-left pl-5">
                В следующем примере рассматривается таблица базы данных, в
                которой содержится информация о продуктах. API "getProductsByID"
                принимает на вход id продукта и возвращает всю информацию о нём.
                Задача злоумышленника - получить все данные из таблицы клиентов.
              </p>
              <p class="text-left pl-5">
                Для защиты от SQL инъекций можно использовать 2 способа:
                <br />
                <span class="text-left pl-5">
                  - экранировать параметры, которые используются в запросах с
                  помощью параметра replacements; </span
                ><br />
                <span class="text-left pl-5">
                  - описывать входные и выходные данные API с помощью JSON
                  schema validator.
                </span>
              </p>
            </div>
          </v-flex>
          <v-divider></v-divider>

          <h2 class="text-left pb-5 pt-3">Реализация со стороны базы данных</h2>

          <v-flex d-flex>
            <div>
              <p class="text-left pl-5 pr-10 pt-10">
                В базе данных присутствуют две основные сущности (стоит
                заметить, что они никак не связаны):
              </p>
              <p class="text-left pl-7">
                - в таблице &#9312; "products" хранится информация о всех
                продуктах;
              </p>
              <p class="text-left pl-7">
                - в таблице &#9313; "clients" хранится информация о всех
                клиентах;
              </p>
            </div>
            <img class="image-style-ch" src="../assets/chemas.png" />
          </v-flex>
          <v-divider></v-divider>

          <h2 class="text-left pb-5 pt-3">Реализация со стороны сервера</h2>

          <v-flex d-flex class="pb-10">
            <div>
              <p class="text-left pl-5 pt-10">
                В данном случае рассматривается API, которая предназначена для
                получения информации о продукте по ID.
              </p>
              <p class="text-left pl-5">
                Рассмотрим код представленный на картинке справа:
              </p>
              <p class="text-left pl-7">
                &#9312; - Описание входных параметров API.
              </p>
              <p class="text-left pl-7">
                &#9313; - Описание выходных параметров API.
              </p>
              <p class="text-left pl-7">&#9314; - Получение ID продукта.</p>
              <p class="text-left pl-7">
                &#9315; - Получение данных о продукте. Обратим внимание на
                экранирование (replacements).
              </p>
            </div>
            <img class="image-style-inj-code" src="../assets/inj_code.png" />
          </v-flex>
          <v-divider></v-divider>
          <h2 class="text-left pb-5 pt-3">Наглядное представление работы</h2>
          <v-flex d-flex>
            <p class="text-left pl-5">
              Ниже преставлены два API. Один из них не содержит JSON schema
              validator и параметра replacements (incorrect API). Попробуем вызвать оба API и передать в
              качестве параметра вместо ID следующую SQL инъекцию: 1'; SELECT *
              FROM clients WHERE id > '0
            </p>
          </v-flex>
          <v-container>
            <v-row class="mx-auto">
              <v-card class="mx-auto" max-width="300">
                <v-card-text class="text--primary">
                  <h3 class="text-center pb-5">API: getProductsByID</h3>
                  <div>
                    <v-textarea
                      auto-grow
                      outlined
                      rows="2"
                      label="ID"
                      v-model="res1"
                    ></v-textarea>
                  </div>
                  <div>{{ responce1 }}</div>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn elevation="7" color="orange" text @click="getProduct">
                    CALL API
                  </v-btn>
                </v-card-actions>
              </v-card>

              <v-card class="mx-auto" max-width="300">
                <v-card-text class="text--primary">
                  <h3 class="text-center pb-5">API: getProductsByIDInec</h3>
                  <div>
                    <v-textarea
                      auto-grow
                      outlined
                      rows="2"
                      label="ID"
                      v-model="res2"
                    ></v-textarea>
                  </div>
                  <div>{{ responce2 }}</div>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn
                    elevation="7"
                    color="orange"
                    text
                    @click="getProductInc"
                  >
                    CALL API
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-container>

          <v-flex d-flex mt-5>
            <div>
              <p class="text-left pl-7 mt-5">
                При вызове корректного API (correct API) в ...
                При вызове некорректного API (incorrect API) в ответе
                вернулись данные из таблицы "clients", так как база данных восприняла
                параметр, как два запроса, и выполнила их последовательно.
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
      res1: "",
      res2: "",
      responce1: [],
      responce2: [],
    };
  },

  methods: {
    async getProduct() {
      this.responce1 = [];
      try {
        const res = await this.$axios.$post("getProductsByID", {
          product_id: this.res1,
        });

        if (res) {
          this.responce1.push(res);
        }
      } catch (err) {
        this.responce1.push(err.response.data);
      }
    },
    async getProductInc() {
      this.responce2 = [];
      try {
        const res = await this.$axios.$post("getProductsByIDInec", {
          product_id: this.res2,
        });
        if (res) {
          this.responce2.push(res);
        }
      } catch (err) {
        this.responce2.push(err.response.data);
      }
    },
  },
};
</script>

<style>
.image-style-tr {
  width: 450px !important;
  height: 470px !important;
  margin-right: 500px;
  margin-left: 100px;
}
.image-style-inj-code {
  width: 600px !important;
  height: 500px !important;
  margin-right: 250px;
  margin-left: 100px;
}
.image-style-ch {
  width: 320px !important;
  height: 300px !important;
  margin-right: 500px;
  margin-left: 100px;
}
.image-style-tr1 {
  width: 640px !important;
  height: 640px !important;
  margin-right: 200px;
  margin-left: 100px;
}
.image-style-db {
  width: 800px !important;
  height: 400px !important;
  margin-right: 50px;
  margin-left: 100px;
}
</style>
