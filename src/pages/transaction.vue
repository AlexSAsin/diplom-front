<template>
  <div>
    <v-toolbar color="amber lighten-1" dense elevation="6">
      <v-col class="d-flex justify-space-around">
        <v-toolbar-title class="font-weight-medium display-1"
          >Транзакции</v-toolbar-title
        >
      </v-col>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-card>
        <v-card-text class="title">
          <h2 class="text-left pb-5">Что это такое и зачем это нужно?</h2>
          <v-flex d-flex>
            <div>
              <p class="text-left pl-5">
                Транзакция - это группа взаимосвязанных изменений в базе,
                которые должны быть либо зафиксированы в ней сразу всей группой,
                либо, в случае неудачи выполнения какого-либо изменения - ни
                одно из связанных изменений не должно оказаться зафиксированным
                в базе.
              </p>
              <p class="text-left pl-5">
                В нашем примере мы рассматриваем следующую ситуацию: есть лоты,
                корпуса и проекты(ЖК). У каждого из них есть статус: в продаже
                или нет. Этот статус, для обеспечения скорости обработки
                запросов на чтение, хранится в каждой сущности. Но если статус
                должен измениться у одной из сущностей - например, корпус
                переходит в статус "не в продаже", а у него при этом нет ни
                одного лота, который сейчас продавался бы - то такое же
                изменения статуса должен получить и связанный с ним проект.
                Транзакция в таком случае нужна, что бы не получилось так, что
                статус корпуса обновился, а связанних с ним лотов - нет. В
                противном случае может оказаться, что ЖК находится в продаже,
                корпус в продаже, но при этом нет ни одного лота,
                соответствующего этим предложениям о продаже.
              </p>
            </div>
          </v-flex>
          <v-divider></v-divider>

          <h2 class="text-left pb-5 pt-3">
            Реализация со стороны базы данных:
          </h2>

          <v-flex d-flex>
            <p class="text-left pl-5 pr-10 pt-4">
              В базе данных присутствуют три основные сущности: таблица &#9312;
              "lots" отвечает за информацию о лотах, таблица &#9313; "buildings"
              содержит информацию о строениях и таблица &#9314; "projects"
              содержит информацию о проектах. Теперь рассмотрим их связи: у
              одного проекта может быть множество строений, но при этом у одного
              строения не может быть множество проектов, аналогично со
              строениями и лотами. Такой тип отношения называется OneToMany
              (один ко многим).
            </p>
            <img class="image-style" src="../assets/transaction.png" />
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
          <h2 class="text-left pb-5 pt-3">Наглядное представление работы:</h2>
          <v-flex d-flex md12>
            <p class="text-left pl-5 pb-10">
              В архитектуре "клиент-сервер" на стороне сервера содержатся API
            </p>
          </v-flex>
          <v-container>
            <v-row class="mx-auto">
              <v-card class="mx-auto" max-width="600">
                <v-card-text class="text--primary">
                  <div>USER ID : 3</div>
                  <div>{{ responce }}</div>
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
      responce: {
        statusCode: "",
        local: "",
        avaibleApi: "",
      },
    };
  },

  methods: {
    async sendReq() {
      const res = await this.$axios.$post("getAviableApi", {
        user_id: 3,
      });
      this.responce = res;
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
