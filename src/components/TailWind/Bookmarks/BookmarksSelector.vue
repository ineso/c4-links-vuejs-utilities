<template>
  <div class="px-4 pb-4 mt-4 bg-white">
    <label>
      <span class="block pt-2 pl-2 -mb-1 text-sm font-semibold text-blue-400 uppercase">
        Saved Bookmarks
      </span>
      <select
        v-if="fetchBookmarksLoading"
        class="w-full px-2 py-1 mt-2 text-sm outline-none font-primary text-grey-500"
        :disabled="true"
      >
        <option value="">
          Loading...
        </option>
      </select>
      <select
        v-else
        v-model="selectedBookmark"
        class="w-full px-2 py-1 mt-2 text-sm outline-none font-primary"
        :class="{'text-grey-500': selectedBookmark === null}"
      >
        <option :value="null">
          - Select a bookmark to load
        </option>
        <option
          v-for="bookmark in displayedBookmark"
          :key="bookmark.id"
          :value="bookmark"
        >
          {{ bookmark.name }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
import { watch, computed, ref } from 'vue'
import { useGtm } from 'vue-gtm'
import filter from 'lodash-es/filter'
import useBookmarks from '../../../features/useBookmarks'

export default {
  name: 'BookmarksSelector',
  
  props: {
    mode: {
      type: String,
      required: true,
      default: 'datashopper'
    },
  },

  emits: ['selected'],

  setup (props, { emit }) {
    const gtm = useGtm()

    const { selectedBookmark, fetchBookmarks, bookmarks, fetchBookmarksLoading } = useBookmarks()
    fetchBookmarks()

    watch(selectedBookmark, () => {
      if (selectedBookmark.value) {
        emit('selected', selectedBookmark.value.config)

        if (gtm) {
          gtm.trackEvent({
            event: 'actions',
            category: 'Bookmark',
            action: 'Use',
            label: 'Select'
          })
        }
      }
    }, { deep: true })

    const displayedBookmark = computed(() => {
      return filter(bookmarks.value, bookmark => bookmark.type === props.mode)
    })

    watch(ref(props.mode), () => {
      selectedBookmark.value = null
    })

    return {
      selectedBookmark,
      displayedBookmark,
      fetchBookmarksLoading
    }
  }
}
</script>
