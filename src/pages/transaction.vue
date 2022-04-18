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
            <div>
              <p class="text-left pl-5 pr-10 pt-15">
                В базе данных присутствуют три основные сущности:
              </p>
              <p class="text-left pl-7">
                - таблица &#9312; "lots" отвечает за информацию о лотах;
              </p>
              <p class="text-left pl-7">
                - таблица &#9313; "buildings" содержит информацию о строениях;
              </p>
              <p class="text-left pl-7">
                - таблица &#9314; "projects" содержит информацию о проектах.
              </p>
              <p class="text-left pl-5 pr-10">
                Теперь рассмотрим их связи. У одного проекта может быть
                множество строений, но при этом у одного строения не может быть
                множество проектов, аналогично со строениями и лотами. Такой тип
                отношения называется OneToMany (один ко многим).
              </p>
            </div>
            <img class="image-style-tr" src="../assets/transaction.png" />
          </v-flex>
          <v-divider></v-divider>

          <h2 class="text-left pb-5 pt-3">Реализация со стороны сервера:</h2>

          <v-flex d-flex class="pb-10">
            <div>
              <p class="text-left pl-5 pt-15">
                В данном случае мы рассматриваем API, которая предназначена для
                удаления лота.
              </p>
              <p class="text-left pl-5">
                Рассмотрим код представленный на картинке справа:
              </p>
              <p class="text-left pl-7">
                &#9312; - Получение id удаляемого лота.
              </p>
              <p class="text-left pl-7">&#9313; - Создание транзакции.</p>
              <p class="text-left pl-7">
                &#9314; - Удаление лота (обновление атрибута withdrawn в таблице
                lots).
              </p>
              <p class="text-left pl-7">
                &#9315; - Получение id строения у данного лота.
              </p>
              <p class="text-left pl-7">
                &#9316; - Получение количества актуальных лотов у строения.
              </p>
              <p class="text-left pl-7">
                &#9317; - Если количество актуальных лотов больше 0, то
                возвращаем сообщение об успешном удалении лота.
              </p>
              <p class="text-left pl-7">
                &#9318; - Иначе аналогично проделываем шаги &#9314;, &#9315;,
                &#9316;, &#9317; для строения, и проекта.
              </p>
            </div>
            <img class="image-style-tr1" src="../assets/t_code.png" />
          </v-flex>
          <v-divider></v-divider>
          <h2 class="text-left pb-5 pt-3">Наглядное представление работы:</h2>
          <v-flex d-flex>
            <div>
              <p class="text-left pl-5 pt-15">
                На текущий момент база данных имеет следующее состояние:
              </p>
              <p class="text-left pl-7">
                &#9312; - Таблица lots содержит в себе 4 записи о лотах и лот с
                id = 1, неактуален.
              </p>
              <p class="text-left pl-7">
                &#9313; - Таблица buildings содержит в себе 2 записи о
                строениях.
              </p>
              <p class="text-left pl-7">
                &#9314; - Таблица projects содержит в себе 2 записи о проектах.
              </p>
            </div>
            <img class="image-style-db" src="../assets/bd_tr.png" />
          </v-flex>
          <v-flex d-flex mt-5>
            <div>
              <p class="text-left pl-7">
                Теперь воспользуемся API и удалим лот с ID = 1
              </p>
              <v-card class="ml-7" max-width="120">
                <v-card-actions>
                  <v-btn color="orange" @click="getInfo" text>
                    DELET LOT
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-flex>
          <v-flex d-flex mt-5>
            <div>
              <p class="text-center">Лоты</p>
              <v-data-table
                :headers="headersL"
                :items="lots"
                class="ml-7"
              ></v-data-table>
            </div>
            <div>
              <p class="text-center">Строения</p>
              <v-data-table
                :headers="headersB"
                :items="buildings"
                class="ml-7"
              ></v-data-table>
            </div>
            <div>
              <p class="text-center">Проекты</p>
              <v-data-table
                :headers="headersP"
                :items="projects"
                class="ml-7"
              ></v-data-table>
            </div>
          </v-flex>
          <v-flex d-flex mt-5>
            <div>
              <p class="text-left pl-7">
                Как мы можем заметить при удалении лота, так-же было удалено
                строение к которму он относился и проект, к которому относилось
                строение. Чтобы вернуть базу данных к исходному состоянию
                необходимо нажать кнопку ниже.
              </p>
              <v-card class="ml-7" max-width="260">
                <v-card-actions>
                  <v-btn color="orange" @click="reset" text>
                    return to original state
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-flex>
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
      headersL: [
        { text: "id", value: "id", sortable: false },
        { text: "building_id", value: "building_id", sortable: false },
        { text: "name", value: "name", sortable: false },
        { text: "created", value: "created", sortable: false },
        { text: "withdrawn", value: "withdrawn", sortable: false },
      ],
      headersB: [
        { text: "id", value: "id", sortable: false },
        { text: "project_id", value: "building_id", sortable: false },
        { text: "name", value: "name", sortable: false },
        { text: "created", value: "created", sortable: false },
        { text: "withdrawn", value: "withdrawn", sortable: false },
      ],
      headersP: [
        { text: "id", value: "id", sortable: false },
        { text: "name", value: "name", sortable: false },
        { text: "created", value: "created", sortable: false },
        { text: "withdrawn", value: "withdrawn", sortable: false },
      ],
      lots: [],
      buildings: [],
      projects: [],
    };
  },

  methods: {
    async getInfo() {
      await this.$axios.$post("deleteLot", {
        lot_id: 1,
      });
      const lots = await this.$axios.$post("getlots");
      const buildings = await this.$axios.$post("getbuilding");
      const projects = await this.$axios.$post("getproject");
      this.lots = lots;
      this.buildings = buildings;
      this.projects = projects;
    },
    async reset() {
      await this.$axios.$post("reload");
      const lots = await this.$axios.$post("getlots");
      const buildings = await this.$axios.$post("getbuilding");
      const projects = await this.$axios.$post("getproject");
      this.lots = lots;
      this.buildings = buildings;
      this.projects = projects;
    },
  },
};
</script>
<style>
/*.v-list-group .v-list-item .v-list-item {*/
/*padding: 0;*/
/*}*/
.image-style-tr {
  width: 450px !important;
  height: 470px !important;
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
