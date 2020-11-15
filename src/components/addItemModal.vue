<template>
  <main>
    <button
      class="temlist-submit-btn"
      v-if="listType !== 'cart'"
      @click.stop.prevent="openModal"
    >
      添加項目
    </button>
    <transition name="fade">
      <div class="add-item-box" v-show="showModal">
        <div class="add-item-modal" @click.stop.prevent="openModal"></div>
        <div class="add-item-content">
          <div class="add-item-close" @click.stop.prevent="openModal">
            &times;
          </div>
          <h2 class="add-item-title">添加項目</h2>
          <div class="add-item-cards">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
            magnam molestiae numquam, cupiditate iure perspiciatis ratione
            quaerat est dolore dignissimos, quos sed accusantium rem enim autem!
            Quod natus dicta, voluptas dolor ad dolores nulla. Ea, distinctio
            vero. Pariatur nostrum saepe suscipit aspernatur impedit non qui
            dolore ut culpa perspiciatis aliquam excepturi quia cum nihil
            temporibus possimus obcaecati quo quam eum, voluptatem dolor! Quia,
            ex ipsam error unde aliquid, in voluptatum distinctio deleniti,
            consectetur accusamus dolore nisi tempore. Impedit distinctio nihil
            laudantium ullam enim exercitationem amet debitis! Expedita
            consequuntur nemo assumenda explicabo magnam, ipsa nam ut laborum
            quia sit beatae maxime autem mollitia, dolorum delectus quas
            molestiae quibusdam unde esse eius laboriosam natus error accusamus!
            Amet et reiciendis, dolores ratione blanditiis laboriosam neque
            officia officiis maiores rem in dolore rerum accusantium id mollitia
            animi impedit assumenda recusandae saepe nisi expedita! Eveniet
            nostrum eius blanditiis non nulla eaque, officiis voluptatem, sunt
            iste et veritatis tenetur necessitatibus quaerat! Saepe, a ipsum.
            Fugit autem repudiandae fugiat, amet dolore repellendus quisquam sit
            et magni ab perspiciatis illum culpa aliquid illo! Natus, quidem
            officiis id, repellendus esse aliquam voluptas praesentium minima,
            voluptates doloremque in accusantium. Ipsum, dolorum? Illum
            repudiandae ipsa voluptatem accusantium quae, quam aliquam est
            doloribus sapiente sint. Deleniti, temporibus in commodi quibusdam
            iusto facilis adipisci nemo totam, corrupti molestiae quod debitis
            expedita cum ullam veniam iure similique suscipit, inventore
            delectus laudantium quisquam fugit repellat architecto eveniet.
            Molestiae porro sapiente fuga vero repellendus sit, aut doloribus
            corrupti, expedita vitae totam sint modi delectus libero voluptate.
            Quibusdam quaerat earum corporis sunt nulla odit porro! Eius sint
            aspernatur illo impedit mollitia magni aut, laborum, totam atque
            minus dolor veniam culpa accusantium obcaecati a quas velit officia
            blanditiis dolore quisquam. Dolorum explicabo mollitia tempore
            aperiam aut cum a dolorem quisquam praesentium necessitatibus.
            Similique sit modi sed dolorum nihil eaque ratione ipsa! Esse enim
            neque reiciendis est, vitae beatae deserunt architecto totam sed
            velit perspiciatis nobis odio aliquam corporis mollitia porro optio
            et blanditiis nihil nemo eaque repellat sit libero! Libero officiis
            totam ipsum voluptatum ratione. Dolorum magni laborum tenetur culpa
            et, labore repellat! Porro fugit, voluptatibus cupiditate provident
            saepe sapiente vel doloremque consequuntur. Dolor ex quo ut ratione
            pariatur molestiae illo suscipit illum nemo accusantium, quos dicta
            impedit deserunt, deleniti harum numquam fugiat perferendis ipsam
            explicabo tenetur distinctio laboriosam sapiente non sunt. Veniam,
            provident atque non eligendi quod expedita est tempora? Iure libero
            commodi praesentium sit reprehenderit porro assumenda! Deserunt illo
            amet dolores numquam, necessitatibus culpa nisi reiciendis pariatur
            temporibus fugiat ducimus quo hic nesciunt dolorem eos deleniti
            saepe dolorum natus esse tempora voluptates explicabo! Recusandae
            molestiae sit exercitationem excepturi error corporis fugiat optio
            tempora expedita. Rem nobis fuga in? Tenetur excepturi, tempore
            dicta delectus nam id dolores rerum quis hic non aspernatur dolorum,
            nesciunt libero ad ducimus tempora ullam necessitatibus expedita
            dolorem est ratione. Repellat mollitia amet excepturi earum beatae
            dolorum porro expedita ex dolore eveniet sapiente quidem, rerum nemo
            est! Animi non doloribus delectus dolore necessitatibus itaque dolor
            sapiente repudiandae maiores praesentium. Nulla, tempora omnis
            corporis illum enim soluta sunt libero nam modi sequi excepturi?
            Voluptates exercitationem labore vero rem dignissimos! Debitis
            necessitatibus explicabo animi perspiciatis vero, labore libero.
            Deleniti, amet necessitatibus suscipit repudiandae eveniet
            cupiditate aperiam, ipsa laborum ducimus molestias nemo explicabo
            est iure dignissimos pariatur optio qui voluptates ipsum recusandae.
            Beatae, consectetur itaque illum sequi ipsam quisquam saepe
            voluptatem, modi velit sunt sit veniam iste odio aspernatur
            veritatis eaque dolores dolorum enim tempora! Veniam quaerat nemo
            illo molestiae officiis consequuntur sint minima ullam explicabo
            similique aspernatur, asperiores omnis nam! Consequatur praesentium
            ratione ut reiciendis nemo porro voluptatum rem? Laboriosam iste
            ipsa reprehenderit asperiores sint nisi accusantium aliquid
            molestias beatae consequatur ad impedit labore ex sequi odit, aut
            voluptas cumque ullam accusamus quidem autem? Non magnam quae nulla
            id, at, cupiditate eius necessitatibus rerum, nisi tempore dolorum
            ullam doloribus repellat! Iusto, a maiores reiciendis exercitationem
            qui dolorem nobis sapiente voluptatibus, distinctio laudantium
            laboriosam illo ipsum ipsam nemo fugit ea facilis, esse
            necessitatibus quibusdam? Voluptate nesciunt in quasi illo facere,
            ipsum odit illum delectus ex eaque atque necessitatibus molestiae,
            corrupti debitis sapiente quae temporibus veritatis, at praesentium
            nisi eum iure voluptatibus inventore. Ab, officia iusto. Similique
            repellat tempora error itaque expedita aperiam fugiat ea commodi
            eligendi laboriosam voluptatum eum voluptates nam odit perspiciatis,
            obcaecati ducimus esse eius quo, delectus sapiente ipsa.
            Voluptatibus, aut ab velit nobis enim mollitia cupiditate beatae
            sunt accusantium? Nemo eligendi, iure vero accusantium commodi quas
            modi perspiciatis quod aliquam error dolor sint dignissimos
            reiciendis saepe, explicabo voluptate, minima laudantium numquam.
            Minus dignissimos dolor voluptatibus, est quia odio explicabo
            cumque. Porro explicabo veniam consectetur eligendi quibusdam
            adipisci labore praesentium, in saepe? Quia, at explicabo! Iusto,
            beatae porro illum minus nam sed totam. Perferendis corporis ullam
            atque nisi maxime libero, magnam ab officia provident fugit laborum
            ex suscipit quibusdam recusandae ducimus vitae. Ratione voluptate
            natus ut explicabo quis dolor, atque distinctio, accusantium
            blanditiis error inventore ipsam at commodi, nostrum ad saepe
            suscipit optio amet odit quas impedit maiores eum. Non ullam quo
            saepe, eum est minus, numquam aliquid aspernatur repellat eaque
            suscipit enim sed temporibus totam ea tenetur deleniti nobis ex
            adipisci mollitia exercitationem aut soluta! Expedita ut totam,
            perspiciatis odio a qui similique fugiat minus cumque ullam enim
            sequi quos repellendus necessitatibus nulla at dolore. Animi labore
            incidunt voluptates ea vel doloremque, tempora officiis mollitia,
            enim architecto impedit cumque perspiciatis a tenetur libero quos
            fuga, minima nisi. Qui sint consequatur fuga esse eum quasi. Odio
            doloribus neque fuga molestiae vel, eligendi ex ut, impedit natus
            quasi sint quas numquam ipsum atque laborum voluptate tempore
            sapiente. Iure vitae tempora facilis magni iusto? Cum saepe ipsum
            placeat, voluptatum, explicabo deserunt, nemo nihil quibusdam illo
            assumenda nisi. Reprehenderit optio praesentium obcaecati magni eos
            fuga asperiores dolorum ipsa possimus tenetur, ducimus, laboriosam
            exercitationem cum officiis at velit ut necessitatibus architecto?
            Dolores facere cum nulla nobis sunt voluptatum blanditiis quaerat
            atque tempora neque adipisci illum, architecto porro sint nihil
            magnam veniam assumenda vero. Aperiam fugit, repellendus debitis est
            eius atque totam necessitatibus quos nesciunt alias iusto hic
            voluptate!
          </div>
        </div>
      </div>
    </transition>
  </main>
</template>
<script>
import itemsAPI from '../apis/items'
import settingAPI from '../apis/setting'
import { Toast } from '../utils/helpers'
export default {
  name: 'addItemModal',
  props: {
    listType: {
      type: String
    },
    oriListItems: {
      type: Array
    }
  },
  data() {
    return {
      showModal: false,
      //undefined表示未取得資料，打開modal時會進行fetch
      items: undefined,
      itemsFilter: [],
      categories: undefined,
      subcategories: undefined,
      listItemsArr: []
    }
  },
  methods: {
    openModal() {
      if (!this.items) {
        this.fetchItems()
      }
      if (!this.categories || !this.subcategories) {
        this.fetchType()
      }
      this.showModal = !this.showModal
    },
    async fetchType() {
      try {
        const { data, statusText } = await settingAPI.getSubcategory()
        if (statusText !== 'OK') {
          throw new Error()
        }
        this.subcategories = data.subcategories
        this.categories = data.categories
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得運動項目與項目種類資料，請稍後再試'
        })
      }
    },
    async fetchItems() {
      try {
        const { data, statusText } = await itemsAPI.getItems()
        if (statusText !== 'OK') {
          throw new Error()
        }

        this.items = data.items.map(item => ({
          ...item,
          isInList: this.listItemsArr.includes(item.id)
        }))
        this.itemsFilter = data.items
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得練習項目，請稍後再試'
        })
      }
    }
  },
  watch: {
    oriListItems(newValue) {
      this.listItems = newValue.map(item => {
        this.listItemsArr.push(item.Item.id)
      })
    }
  }
}
</script>

<style lang="scss">
.add-item-box,
.add-item-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.add-item-box {
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-item-modal {
  z-index: -10;
  background-color: $op-light-black;
}
.add-item-content {
  position: relative;
  margin: 50px 20px;
  padding: 10px 20px;
  max-width: 800px;
  width: 80%;
  border-radius: 3px;
  background-color: $white;
  .add-item-close {
    position: absolute;
    top: 0;
    right: 5px;
    font-size: 2rem;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      color: $logo-green;
    }
  }
  .add-item-title {
    text-align: center;
    color: $logo-green;
  }
  .add-item-cards {
    max-height: 75vh;
    overflow-y: scroll;
    @extend .scroll-style;
    font-size: 1rem;
    padding-bottom: 10px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
