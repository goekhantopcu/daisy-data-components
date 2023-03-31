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
  <DataTable :options="options">
    <template #dd-table-search>
      <div>
        <input type="text" placeholder="Suche..." class="input input-bordered w-full" v-model="options.searchQuery"/>
        <h1 class="text-xl text-red-400 font-bold">Alle Config Items</h1>
      </div>
    </template>

    <template #column-title="{ column }">
      <span class="select-none" :class="{'underline': column.sortable}">
        {{ column.title }}
      </span>
    </template>

    <template #body-loading>
      <div role="status">
        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"/>
          <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </template>

    <template #body-no-data>
      <div class="hero">
        <div class="hero-content text-center">
          <h1 class="text-2xl font-bold">No data available</h1>
        </div>
      </div>
    </template>

    <template #firstName="{ item }">
      <div class="badge badge-primary">
        <span>{{ item.firstName }}</span>
      </div>
    </template>
    <template #lastName="{ item }">
      <span>{{ item.lastName }}</span>
    </template>
    <template #dateOfBirth="{ item }">
      <span>{{ item.dateOfBirth.toLocaleDateString() }}</span>
    </template>

    <template #footer="{ pages, page, pageAmount, pageId }">
      <div class="flex justify-between items-end gap-3 w-full">
        <div class="btn-group">
          <button class="btn"
                  @click="options.pageCurrentId = options.pageCurrentId - 1"
                  :class="{ 'btn-disabled': options.pageCurrentId === 0 }">«
          </button>
          <button class="btn no-animation">Page {{ options.pageCurrentId + 1 }}</button>
          <button class="btn"
                  @click="options.pageCurrentId = options.pageCurrentId + 1"
                  :class="{ 'btn-disabled': options.pageCurrentId === pages.length -1 }">»
          </button>
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Einträge pro Seite</span>
          </label>
          <select class="select select-bordered" v-model="options.pageSize">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="-1">Alle</option>
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
  minSearchQueryLength: 3,
  enablePagination: true,
  pageSize: 5,
  pageCurrentId: 0,
  isDataLoading: true,
  columns: columns,
  items: []
})

const loadPersons = async () => {
  options.value.items = await findPersons()
  options.value.isDataLoading = false
}

onMounted(loadPersons)
</script>

<style>
.dd-table {
  @apply table-zebra
}

.dd-table-body-column:nth-child(1) {
  @apply w-1/3
}

.dd-table-body-column:nth-child(2) {
  @apply w-1/3
}

.dd-table-body-column:nth-child(3) {
  @apply w-1/3
}
</style>
```
