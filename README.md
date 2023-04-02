# Daisy-Data-Components

### Explanation

The "daisy-data-components" NPM package is a powerful and versatile TypeScript library that simplifies the process of
displaying complex datasets in a simple and intuitive manner. Developed using the popular front-end development
frameworks daisyUI and TailwindCSS, this package offers a range of customizable data components that are designed to
provide an optimal user experience while handling large volumes of data.

One of the standout features of this library is its ease-of-use. With a user-friendly interface and clear documentation,
developers can quickly and efficiently integrate "daisy-data-components" into their web applications. Whether you are
new to front-end development or an experienced developer, this library makes it easy to create beautiful and functional
data visualizations.

In addition to its ease-of-use, "daisy-data-components" is also highly customizable. Unlike other data visualization
libraries, all of the components included in this package can be customized to fit your specific needs. This means that
you can develop your own components to create a truly unique data visualization experience for your users.

It's worth noting that "daisy-data-components" has already been adopted by some of my projects at work, a testament
to its quality and reliability. With built-in pagination, sorting, and search functionality, this package is the perfect
solution for developers looking to enhance their data visualization capabilities.

In summary, the "daisy-data-components" NPM package is a powerful and flexible data visualization library that
simplifies the display of complex datasets. With its ease-of-use, customization options, and proven reliability, this
package is an essential tool for any developer working with data-centric web applications.

### Installation

1. Install [Vue3](https://v3.ru.vuejs.org/guide/installation.html) (You also need vue-tsc, this project is built up with
   typescript)
2. Install [TailwindCSS](https://v2.tailwindcss.com/docs/guides/vue-3-vite)
3. Install [DaisyUI](https://daisyui.com/docs/install)
4. Install this package

```
npm install daisy-data-components
```

### Example

```vue
<template>
   <div class="flex justify-between items-center mb-3">
      <div class="flex justify-start items-center gap-3">
         <h1 class="text-lg text-white font-bold">Alle Config Items</h1>
         <div class="badge badge-primary">
            <span>{{ options.items.length }}</span>
         </div>
      </div>
      <input type="text" placeholder="Search..." class="input input-bordered" v-model="options.searchQuery"/>
   </div>
   <DataTable :options="options">
      <!-- The title of the column <thead> -> <tr> -> <th> -->
      <template #column="{ column }">
         <div v-if="column.sortable" class="flex gap-3 items-center">
            <span class="underline">{{ column.title }}</span>
            <font-awesome-icon icon="fa-solid fa-sort" />
         </div>
         <span v-else>{{ column.title }}</span>
      </template>

      <!-- Separate <tbody> when the data is loading (uses full width and height) -->
      <template #loading>
         <div role="status" class="flex flex-col justify-center items-center gap-3">
            <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-white fa-3x" />
            <span class="text-white">Loading...</span>
         </div>
      </template>

      <!-- Separate <tbody> when there is no data available (uses full width and height) -->
      <template #no-data>
         <div role="status" class="flex flex-col justify-center items-center gap-3">
            <font-awesome-icon icon="fa-solid fa-bomb" class="text-red-400 fa-3x" />
            <span class="text-white">No data found</span>
         </div>
      </template>

      <!-- The Firstname Column <tbody> -> <tr> -> <td> -->
      <template #firstName="{ item }">
         <div class="badge badge-primary">
            <span>{{ item.firstName }}</span>
         </div>
      </template>

      <!-- The Lastname Column <tbody> -> <tr> -> <td> -->
      <template #lastName="{ item }">
         <span>{{ item.lastName }}</span>
      </template>

      <!-- The DateOfBirth Column <tbody> -> <tr> -> <td> -->
      <template #dateOfBirth="{ item }">
         <span>{{ item.dateOfBirth.toLocaleDateString() }}</span>
      </template>

      <!-- The <tfoot> -->
      <template #foot="{ pages, page, pageAmount, pageId }">
         <div class="flex justify-between items-end gap-3 w-full">
            <div class="btn-group">
               <button class="btn"
                       @click="options.pageCurrentId = options.pageCurrentId - 1"
                       :class="{ 'btn-disabled': options.pageCurrentId === 0 }">«</button>
               <button class="btn no-animation">Page {{ options.pageCurrentId + 1 }}</button>
               <button class="btn"
                       @click="options.pageCurrentId = options.pageCurrentId + 1"
                       :class="{ 'btn-disabled': options.pageCurrentId === pages.length -1 }">»</button>
            </div>
            <div class="form-control w-full max-w-xs">
               <label class="label">
                  <span class="label-text">Rows per page</span>
               </label>
               <select class="select select-bordered" v-model="options.pageSize">
                  <option v-for="(pageSizeOption, index) in pageSizeOptions"
                          :key="index"
                          :value="pageSizeOption.value">{{ pageSizeOption.title }}</option>
               </select>
            </div>
         </div>
      </template>

   </DataTable>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import DataTable from "daisy-data-components/src/table/DataTable.vue";
import {DataTableColumn, DataTableOptions} from "daisy-data-components/src/table/data-table";

export interface Address {
   street: string;
   houseNumber: string;
   zipCode: string;
   town: string;
   country: string;
}

export interface Person {
   id: number;
   firstName: string;
   lastName: string;
   dateOfBirth: Date;
   address: Address;
}

const pageSizeOptions = [
   {
      title: '5',
      value: 5
   },
   {
      title: '10',
      value: 10
   },
   {
      title: '15',
      value: 15
   },
   {
      title: 'Alle',
      value: -1
   }
]

const findPersons = async (): Promise<Person[]> => {
   return [
      {
         id: 1,
         firstName: "Max",
         lastName: "Mustermann",
         dateOfBirth: new Date("1990-05-08"),
         address: {
            street: "Musterstraße",
            houseNumber: "12",
            zipCode: "54321",
            town: "Musterstadt",
            country: "Deutschland"
         }
      },
      {
         id: 2,
         firstName: "Maria",
         lastName: "Müller",
         dateOfBirth: new Date("1985-12-20"),
         address: {
            street: "Am Waldrand",
            houseNumber: "5",
            zipCode: "98765",
            town: "Dorfheim",
            country: "Österreich"
         }
      },
      {
         id: 3,
         firstName: "John",
         lastName: "Doe",
         dateOfBirth: new Date("1975-08-16"),
         address: {
            street: "Main Street",
            houseNumber: "123",
            zipCode: "55555",
            town: "New York",
            country: "USA"
         }
      },
      {
         id: 4,
         firstName: "Jane",
         lastName: "Doe",
         dateOfBirth: new Date("1980-02-29"),
         address: {
            street: "Highway 1",
            houseNumber: "321",
            zipCode: "99999",
            town: "Los Angeles",
            country: "USA"
         }
      },
      {
         id: 5,
         firstName: "Hans",
         lastName: "Schmidt",
         dateOfBirth: new Date("1995-07-03"),
         address: {
            street: "Musterweg",
            houseNumber: "15",
            zipCode: "12345",
            town: "Musterstadt",
            country: "Deutschland"
         }
      },
      {
         id: 6,
         firstName: "Emily",
         lastName: "Jones",
         dateOfBirth: new Date("1999-11-11"),
         address: {
            street: "Oak Street",
            houseNumber: "10",
            zipCode: "12345",
            town: "San Francisco",
            country: "USA"
         }
      },
      {
         id: 7,
         firstName: "Juan",
         lastName: "Lopez",
         dateOfBirth: new Date("1988-06-25"),
         address: {
            street: "Calle Mayor",
            houseNumber: "6",
            zipCode: "28001",
            town: "Madrid",
            country: "Spanien"
         }
      },
      {
         id: 8,
         firstName: "Elena",
         lastName: "Garcia",
         dateOfBirth: new Date("1977-03-18"),
         address: {
            street: "Carrer Gran",
            houseNumber: "8",
            zipCode: "08001",
            town: "Barcelona",
            country: "Spanien"
         }
      },
      {
         id: 9,
         firstName: "Sophie",
         lastName: "Müller",
         dateOfBirth: new Date("1988-09-12"),
         address: {
            street: "Hauptstraße",
            houseNumber: "17",
            zipCode: "12345",
            town: "Kleinstadt",
            country: "Deutschland"
         }
      },
      {
         id: 10,
         firstName: "David",
         lastName: "Kim",
         dateOfBirth: new Date("1995-02-22"),
         address: {
            street: "5th Avenue",
            houseNumber: "123",
            zipCode: "54321",
            town: "New York",
            country: "USA"
         }
      },
      {
         id: 11,
         firstName: "Anna",
         lastName: "Gonzalez",
         dateOfBirth: new Date("1982-12-05"),
         address: {
            street: "Calle de la Rosa",
            houseNumber: "23",
            zipCode: "28003",
            town: "Madrid",
            country: "Spanien"
         }
      },
      {
         id: 12,
         firstName: "Tom",
         lastName: "Hansen",
         dateOfBirth: new Date("1990-11-14"),
         address: {
            street: "Møllegade",
            houseNumber: "7",
            zipCode: "5000",
            town: "Odense",
            country: "Dänemark"
         }
      },
      {
         id: 13,
         firstName: "Lena",
         lastName: "Kühn",
         dateOfBirth: new Date("1979-06-18"),
         address: {
            street: "Am Hang",
            houseNumber: "4",
            zipCode: "98765",
            town: "Bergdorf",
            country: "Österreich"
         }
      }
   ]
}

const columns: DataTableColumn<Person>[] = [
   {
      slot: 'firstName',
      title: 'First Name',
      sortable: true,
      searchable: true,
      queryPredicate: (data: Person) => data.firstName
   },
   {
      slot: 'lastName',
      title: 'Last Name',
      sortable: true,
      searchable: true,
      queryPredicate: (data: Person) => data.lastName
   },
   {
      slot: 'dateOfBirth',
      title: 'Birthday',
      sortable: false,
      searchable: false,
      queryPredicate: (data: Person) => data.dateOfBirth.toLocaleDateString()
   }
]

const options = ref<DataTableOptions<Person>>({
   enableSearch: true,
   searchQuery: '',
   minSearchQueryLength: 0,
   enablePagination: true,
   pageSize: 5,
   pageCurrentId: 0,
   isDataLoading: true,
   columns: columns,
   items: []
})

const loadPersons = async () => {
   options.value.isDataLoading = true
   options.value.items = await findPersons()
   options.value.isDataLoading = false
}

onMounted(loadPersons)
</script>

<style>
.dd-table {
   @apply table-zebra table-compact
}

.dd-table-body-column-0 {
   @apply w-1/3
}

.dd-table-body-column-1 {
   @apply w-1/3
}

.dd-table-body-column-2 {
   @apply w-1/3
}
</style>
```
