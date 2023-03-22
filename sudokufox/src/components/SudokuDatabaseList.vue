<!--
     <SudokuDatabaseList
       @open_collection="name => alert(name)"
     />
-->

<template>
  <div>
    <v-list lines="three">

      <v-list-item
        v-for="item in state.items"
        :key="item.name"
        :title="item.name"
        :subtitle="item.count + ' puzzles'"
        @click="open_item(item)"
        @contextmenu.prevent="context_menu(item)"
      >
        <template v-slot:append>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                icon="mdi-dots-vertical"
                v-bind="props"
                variant="text"
                :id="'menu'+item.id"
                ref="menu_buttons"
              ></v-btn>
            </template>

            <v-list>
              <v-list-item @click="open_rename(item)">
                <template v-slot:append><v-icon icon="mdi-pencil"></v-icon></template>
                <v-list-item-title v-t="'Rename'"></v-list-item-title>
              </v-list-item>

              <v-list-item @click="open_delete(item)">
                <template v-slot:append><v-icon icon="mdi-delete"></v-icon></template>
                <v-list-item-title v-t="'Delete'"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

        </template>
      </v-list-item>

    </v-list>

    <!-- Rename dialog -->
    <InputDialog
      ref="input_dialog"
      @confirm="rename_collection"
    />

    <!-- Confirm dialog -->
    <ConfirmDialog
      ref="confirm_dialog"
      @confirm="delete_collection"
    />
  </div>
</template>

<script setup>
 import { ref, nextTick, reactive, computed, onMounted } from 'vue'
 import SudokuDatabase from '@/sudoku/SudokuDatabase';
 import InputDialog from '@/components/InputDialog';
 import ConfirmDialog from '@/components/ConfirmDialog';
 import { useI18n } from 'vue-i18n'

 const { t, locale } = useI18n({
   inheritLocale: true,
   useScope: 'local'
 });

 const input_dialog = ref('input_dialog');
 const confirm_dialog = ref('confirm_dialog');

 const menu_buttons = ref([]);

 const emit = defineEmits([
   'open_collection',
 ]);

 const state = reactive({
   rename_dialog: false,
   rename_collection_id: {},
   rename_collection_name: '',
   items: [],
 });

 onMounted(load_items);

 function load_items() {
   state.items = Object.values(SudokuDatabase.get_collections());
 }

 function open_item(item) {
   emit('open_collection', item.id);
 }

 function context_menu(item) {
   const menu_id = 'menu'+item.id;
   const pos = menu_buttons.value.map(m => m.$el.id).indexOf(menu_id);
   menu_buttons.value[pos].$el.click();
   return false;
 }

 function open_rename(col) {
   input_dialog.value.open(col.name, col.id);
 }

 function open_delete(col) {
   confirm_dialog.value.open({
     title: t("confirm_dialog title"),
     message: t("confirm_dialog message", {name: col.name}),
     meta: col.id,
   });
 }

 function rename_collection(new_name, col_id) {
   SudokuDatabase.edit_collection_property(col_id, 'name', new_name);
   load_items();
 }

 function delete_collection(col_id) {
   SudokuDatabase.delete_collection(col_id);
   load_items();
 }
</script>

<i18n lang="yaml">
en:
  confirm_dialog title: "Delete collection"
  confirm_dialog message: "Delete \"{name}\"? All your solved puzzles for that collection will be lost."

ca:
  Rename: "Renombrar"
  Delete: "Eliminar"
  confirm_dialog title: "Eliminar col·lecció"
  confirm_dialog message: "Eliminar \"{name}\"? Tots els sudokus de la colecció es perdran"

es:
  Rename: "Renombrar"
  Delete: "Eliminar"
  confirm_dialog title: "Eliminar colección"
  confirm_dialog message: "¿Eliminar \"{name}\"? Todos los sudokus de la colección se perderan"
</i18n>
