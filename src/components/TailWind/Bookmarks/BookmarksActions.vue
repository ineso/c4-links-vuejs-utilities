<template>
  <div
    v-show="actionsLoading"
    class="fixed bottom-0 flex items-center justify-center w-full h-12 bg-white"
  >
    Loading...
  </div>
  <div v-show="!actionsLoading">
    <div
      v-if="selectedBookmark === null"
      class="fixed bottom-0 flex items-center justify-center w-full h-12 bg-white"
    >
      <span class="mr-2">or</span>
      <a
        href="javascript:void(0)"
        class="block text-center underline hover:opacity-75"
        @click="openCreateModal"
      >Save as new bookmark</a>
    </div>
    <div
      v-else
      class="fixed bottom-0 flex items-center justify-center w-full h-12 text-sm bg-white"
    >
      <a
        href="javascript:void(0)"
        class="block mr-4 text-center text-red-300 hover:opacity-75"
        @click="openDeleteModal"
      >Delete</a>
      <a
        href="javascript:void(0)"
        class="block mr-2 text-center underline hover:opacity-75"
        @click="openUpdateModal"
      >Update</a>
      <span class="mr-2 lowercase">or</span>
      <a
        href="javascript:void(0)"
        class="block font-medium text-center hover:opacity-75"
        @click="openCreateModal"
      >Create New Bookmark</a>
    </div>
    <teleport
      v-if="showDeleteModal"
      to="#modal-teleport"
    >
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25"
        @click="cancelDelete"
      >
        <div
          class="px-8 py-8 bg-white box"
          @click.stop
        >
          <h3 class="mb-2 text-sm font-semibold uppercase">
            Delete bookmark
          </h3>
          <p class="text-sm mb-6">
            Are you sure you want to delete the bookmark: {{ selectedBookmark.name }}?
          </p>
          <div class="mt-8 text-center">
            <a
              class="inline-block px-2 py-1 text-sm font-medium leading-tight text-gray-600
                     uppercase bg-gray-400 cursor-pointer focus:outline-none hover:opacity-75 mr-6"
              href="javascript:void(0)"
              @click="cancelDelete"
            >Cancel</a>
            <a
              v-if="deleteBookmarksLoading"
              class="inline-block px-2 py-1 text-sm font-medium leading-tight text-white uppercase
                     focus:outline-none bg-gray-400 cursor-not-allowed"
              href="javascript:void(0)"
            >Loading...</a>
            <a
              v-else
              class="inline-block px-2 py-1 text-sm font-medium leading-tight text-white uppercase
                     bg-blue-400 cursor-pointer focus:outline-none hover:opacity-75"
              href="javascript:void(0)"
              @click="deleteBookmarkClick"
            >Delete</a>
          </div>
        </div>
      </div>
    </teleport>
    <teleport
      v-if="showUpdateModal"
      to="#modal-teleport"
    >
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25"
        @click="cancelUpdate"
      >
        <div
          class="px-8 py-8 bg-white box"
          @click.stop
        >
          <h3 class="mb-2 text-sm font-semibold uppercase">
            Update bookmark
          </h3>
          <p class="text-sm mb-6">
            Update the bookmark: {{ selectedBookmark.name }} with the current filters selection
          </p>
          <div>
            <label class="flex mt-4">
              <span class="relative block w-1/2 text-sm">Rename Bookmark</span>
              <input
                v-model="updateBookmarkName"
                class="relative block w-1/2 px-2 py-1 pl-2 text-sm border border-black
                       outline-none border-opacity-30 font-primary"
                type="text"
              >
            </label>
          </div>
          <div class="mt-8 text-center">
            <a
              class="inline-block px-2 py-1 text-sm font-medium leading-tight text-gray-600
                     uppercase bg-gray-400 cursor-pointer focus:outline-none hover:opacity-75 mr-6"
              href="javascript:void(0)"
              @click="cancelUpdate"
            >Cancel</a>
            <a
              v-if="updateBookmarksLoading"
              class="inline-block px-2 py-1 text-sm font-medium leading-tight text-white uppercase
                     focus:outline-none bg-gray-400 cursor-not-allowed"
              href="javascript:void(0)"
            >Loading...</a>
            <a
              v-else
              class="inline-block px-2 py-1 text-sm font-medium leading-tight text-white uppercase
                     focus:outline-none"
              href="javascript:void(0)"
              :class="[
                updateBookmarkName.length < 1 ?
                  'bg-gray-400 cursor-not-allowed' :
                  'bg-blue-400 hover:opacity-75 cursor-pointer'
              ]"
              @click="updateBookmarkClick"
            >Update</a>
          </div>
        </div>
      </div>
    </teleport>
    <teleport
      v-if="showCreateModal"
      to="#modal-teleport"
    >
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25"
        @click="cancelCreate"
      >
        <div
          class="px-8 py-8 bg-white box"
          @click.stop
        >
          <h3 class="mb-2 text-sm font-semibold uppercase">
            Create bookmark
          </h3>
          <p class="text-sm mb-6">
            Save this filters selection in a bookmark
          </p>
          <div>
            <label class="flex mt-4">
              <span class="relative block w-1/2 text-sm">Bookmark Name</span>
              <input
                v-model="createBookmarkName"
                class="relative block w-1/2 px-2 py-1 pl-2 text-sm border border-black
                       outline-none border-opacity-30 font-primary"
                type="text"
              >
            </label>
          </div>
          <div class="mt-8 text-center">
            <a
              class="inline-block px-2 py-1 text-sm font-medium leading-tight text-gray-600
                     uppercase bg-gray-400 cursor-pointer focus:outline-none hover:opacity-75 mr-6"
              href="javascript:void(0)"
              @click="cancelCreate"
            >Cancel</a>
            <a
              v-if="addBookmarkLoading"
              class="inline-block px-2 py-1 text-sm font-medium leading-tight text-white uppercase
                     focus:outline-none bg-gray-400 cursor-not-allowed"
              href="javascript:void(0)"
            >Loading...</a>
            <a
              v-else
              class="inline-block px-2 py-1 text-sm font-medium leading-tight text-white uppercase
                     focus:outline-none"
              href="javascript:void(0)"
              :class="[
                createBookmarkName.length < 1 ?
                  'bg-gray-400 cursor-not-allowed' :
                  'bg-blue-400 hover:opacity-75 cursor-pointer'
              ]"
              @click="addBookmarkClick"
            >Create</a>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import some from 'lodash-es/some'
import { computed, ref, watch } from 'vue'
import { useGtm } from 'vue-gtm'
import useBookmarks from '../../../features/useBookmarks'

export default {
  name: 'BookmarksActions',

  props: {
    filters: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      required: true,
      default: 'datashopper'
    },
  },

  setup (props) {
    const gtm = useGtm()
    const showDeleteModal = ref(false)
    const showCreateModal = ref(false)
    const showUpdateModal = ref(false)
    const updateBookmarkName = ref('')
    const createBookmarkName = ref('')
    const {
      selectedBookmark,
      addBookmarkLoading,
      addBookmark,
      updateBookmarksLoading,
      updateBookmark,
      deleteBookmarksLoading,
      deleteBookmark
    } = useBookmarks()

    const openCreateModal = () => {
      showCreateModal.value = true
      if (gtm) {
        gtm.trackEvent({
          event: 'actions',
          category: 'Bookmark',
          action: 'Save',
          label: 'Initiate'
        })
      }
    }

    const cancelCreate = () => {
      showCreateModal.value = false
      createBookmarkName.value = ''
      if (gtm) {
        gtm.trackEvent({
          event: 'actions',
          category: 'Bookmark',
          action: 'Save',
          label: 'Cancel'
        })
      }
    }

    const openDeleteModal = () => {
      showDeleteModal.value = true
      if (gtm) {
        gtm.trackEvent({
          event: 'actions',
          category: 'Bookmark',
          action: 'Delete',
          label: 'Initiate'
        })
      }
    }

    const cancelDelete = () => {
      showDeleteModal.value = false
      if (gtm) {
        gtm.trackEvent({
          event: 'actions',
          category: 'Bookmark',
          action: 'Delete',
          label: 'Cancel'
        })
      }
    }

    const openUpdateModal = () => {
      showUpdateModal.value = true
      if (gtm) {
        gtm.trackEvent({
          event: 'actions',
          category: 'Bookmark',
          action: 'Update',
          label: 'Initiate'
        })
      }
    }

    const cancelUpdate = () => {
      showUpdateModal.value = false
      updateBookmarkName.value = selectedBookmark.value?.name || ''
      if (gtm) {
        gtm.trackEvent({
          event: 'actions',
          category: 'Bookmark',
          action: 'Update',
          label: 'Cancel'
        })
      }
    }

    watch(selectedBookmark, () => {
      updateBookmarkName.value = selectedBookmark.value?.name || ''
    }, { immediate: true })

    const actionsLoading = computed(() => some([
      addBookmarkLoading.value,
      updateBookmarksLoading.value,
      deleteBookmarksLoading.value
    ]))

    const deleteBookmarkClick = () => {
      if (selectedBookmark.value) {
        if (gtm) {
          gtm.trackEvent({
            event: 'actions',
            category: 'Bookmark',
            action: 'Delete',
            label: 'Confirm'
          })
        }

        deleteBookmark({ id: selectedBookmark.value.id }).then(() => {
          showDeleteModal.value = false
          selectedBookmark.value = null
        })
      }
    }

    const updateBookmarkClick = () => {
      if (selectedBookmark.value) {
        if (gtm) {
          gtm.trackEvent({
            event: 'actions',
            category: 'Bookmark',
            action: 'Update',
            label: 'Confirm'
          })
        }

        updateBookmark({
          id: selectedBookmark.value.id,
          name: updateBookmarkName.value,
          config: props.filters,
          type: props.mode
        })
          .then((data) => {
            showUpdateModal.value = false
            selectedBookmark.value = data
          })
      }
    }

    const addBookmarkClick = () => {
      if (createBookmarkName.value) {
        if (gtm) {
          gtm.trackEvent({
            event: 'actions',
            category: 'Bookmark',
            action: 'Save',
            label: 'Confirm'
          })
        }

        addBookmark({ 
          name: createBookmarkName.value,
          config: props.filters,
          type: props.mode
        }).then(data => {
          showCreateModal.value = false
          selectedBookmark.value = data
          createBookmarkName.value = ''
        })
      }
    }

    return {
      showDeleteModal,
      showCreateModal,
      showUpdateModal,
      selectedBookmark,
      updateBookmarkName,
      createBookmarkName,
      actionsLoading,
      deleteBookmarkClick,
      updateBookmarkClick,
      addBookmarkClick,
      addBookmarkLoading,
      updateBookmarksLoading,
      deleteBookmarksLoading,
      openCreateModal,
      cancelCreate,
      openDeleteModal,
      cancelDelete,
      openUpdateModal,
      cancelUpdate
    }
  }
}
</script>

<style scoped>
.box {
  max-width: 75%;
  width: 500px;
}
</style>
