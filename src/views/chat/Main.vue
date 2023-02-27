<template>
  <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
    <!-- BEGIN: Chat Side Menu -->
    <TabGroup class="col-span-12 lg:col-span-4 2xl:col-span-3">
      <div class="intro-y pr-1">
        <div class="box p-2">
          <TabList class="nav-pills">
            <Tab class="w-full py-2" tag="button">Chats</Tab>
            <Tab class="w-full py-2" tag="button">Grupos</Tab>
            <Tab class="w-full py-2" tag="button">Perfil</Tab>
          </TabList>
        </div>
      </div>
      <TabPanels>
        <TabPanel>
          <div class="pr-1">
            <div class="box px-5 pt-5 pb-5 lg:pb-0 mt-5">
              <div class="relative text-slate-500">
                <input
                  type="text"
                  class="form-control py-3 px-4 border-transparent bg-slate-100 pr-10"
                  placeholder="Buscar mensajes o usuarios..."
                />
                <SearchIcon
                  class="w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0"
                />
              </div>
              <div class="overflow-x-auto scrollbar-hidden">
                <div class="flex mt-5">
                  <a
                    v-for="(faker, fakerKey) in $_.take($f(), 10)"
                    :key="fakerKey"
                    href=""
                    class="w-10 mr-4 cursor-pointer"
                  >
                  
                    <div class="w-12 h-12 flex-none image-fit rounded-full">
                      <ProfileAvatar :username="faker.users[0].name" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>
                      <div
                        class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                      ></div>
                    </div>
                    <div
                      class="text-xs text-slate-500 truncate text-center mt-2"
                    >
                      {{ faker.users[0].name }}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4"
          >
            <div
              v-for="(faker, fakerKey) in $_.take($f(), 1)"
              :key="fakerKey"
              class="intro-x cursor-pointer box relative flex items-center p-5"
              :class="{ 'mt-5': fakerKey }"
              @click="showChatBox"
            >
              <div class="w-12 h-12 flex-none image-fit mr-1">
                <ProfileAvatar :username="faker.users[0].name" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>

                <div
                  class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                ></div>
              </div>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="javascript:;" class="font-medium">{{
                    faker.users[0].name
                  }}</a>
                  <div class="text-xs text-slate-400 ml-auto">
                    {{ faker.times[0] }}
                  </div>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  {{ faker.news[0].shortContent }}
                </div>
              </div>
              <div
                v-if="faker.trueFalse[0]"
                class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1"
              >
                {{ faker.notificationCount }}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>

          <div
            class="chat__user-list overflow-y-auto scrollbar-hidden pr-1 pt-1"
          >
            <div class="cursor-pointer box relative flex items-center p-5 mt-5">
              <div class="w-12 h-12 flex-none image-fit mr-1">
                <ProfileAvatar username="Grupo Gerencia" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>
              </div>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="" class="font-medium">Grupo Geréncia</a>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  8 miembros
                </div>
              </div>
            </div>
            <div class="cursor-pointer box relative flex items-center p-5 mt-5">
              <div class="w-12 h-12 flex-none image-fit mr-1">
                <ProfileAvatar username="Grupo Conductores" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>
                <div
                  class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                ></div>
              </div>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="" class="font-medium">Grupo Conductores</a>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  25 miembros
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div class="pr-1">
            <div class="box px-5 py-10 mt-5">
              <div
                class="w-20 h-20 flex-none overflow-hidden mx-auto"
              >
              <ProfileAvatar :username="useAuthentication.user.name" custom-size="5rem" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>
              </div>
              <div class="text-center mt-3">
                <div class="font-medium text-lg">
                  <!-- {{ $f()[0]["users"][0]["name"] }} -->
                  {{ useAuthentication.user.name }}
                </div>
                <div class="text-slate-500 mt-1">
                  Gestor de Tráfico
                </div>
              </div>
            </div>
            <div class="box p-5 mt-5">
              <div
                class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5"
              >
                <div>
                  <div class="text-slate-500">Empresa</div>
                  <div class="mt-1">Transportes Lorem Ipsum</div>
                </div>
                <GlobeIcon class="w-4 h-4 text-slate-500 ml-auto" />
              </div>
              <div
                class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 py-5"
              >
                <div>
                  <div class="text-slate-500">Phone</div>
                  <div class="mt-1">+34 999 000 222</div>
                </div>
                <MicIcon class="w-4 h-4 text-slate-500 ml-auto" />
              </div>
              <div
                class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 py-5"
              >
                <div>
                  <div class="text-slate-500">Email</div>
                  <!-- <div class="mt-1">{{ $f()[0]["users"][0]["email"] }}</div> -->
                  <div class="mt-1">yo@micorreo.es</div>
                </div>
                <MailIcon class="w-4 h-4 text-slate-500 ml-auto" />
              </div>
              <div class="flex items-center pt-5">
                <div>
                  <div class="text-slate-500">Se unió el:</div>
                  <div class="mt-1">{{ $f()[0]["dates"][0] }}</div>
                </div>
                <ClockIcon class="w-4 h-4 text-slate-500 ml-auto" />
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
    <!-- END: Chat Side Menu -->
    <!-- BEGIN: Chat Content -->
    <div class="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
      <div class="chat__box box">
        <!-- BEGIN: Chat Active -->
        <div v-if="chatBox" class="h-full flex flex-col">
          <div
            class="flex flex-col sm:flex-row border-b border-slate-200/60 dark:border-darkmode-400 px-5 py-4"
          >
            <div class="flex items-center">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative"
              >

              <ProfileAvatar :username="$f()[0]['users'][0]['name']" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>
              </div>
              <div class="ml-3 mr-auto">
                <div class="font-medium text-base">
                  {{ $f()[0]["users"][0]["name"] }}
                </div>
                <div class="text-slate-500 text-xs sm:text-sm">
                  <span class="mx-1 text-success">•</span> Online
                </div>
              </div>
            </div>
            <div
              class="flex items-center sm:ml-auto mt-5 sm:mt-0 border-t sm:border-0 border-slate-200/60 pt-3 sm:pt-0 -mx-5 sm:mx-0 px-5 sm:px-0"
            >
              
                <Tippy tag="a" class="tooltip primary ml-4 mr-2" content="Desacoplar Ventana" :options="{
                    theme: 'light',
                  }"><ExternalLinkIcon/></Tippy>

            </div>
          </div>
          <div class="overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1">
            <div class="chat__box__text-box flex items-end float-left mb-4">
              <div
                class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5"
              >
              <ProfileAvatar :username="$f()[0]['users'][0]['name']" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>
              </div>
              <div
                class="bg-slate-100 dark:bg-darkmode-400 px-4 py-3 text-slate-500 rounded-r-md rounded-t-md"
              >
                Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                <div class="mt-1 text-xs text-slate-500">Hace 2 minutos</div>
              </div>
              <Dropdown class="hidden sm:block ml-3 my-auto">
                <DropdownToggle
                  tag="a"
                  href="javascript:;"
                  class="w-4 h-4 text-slate-500"
                >
                  <MoreVerticalIcon class="w-4 h-4" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem>
                      <CornerUpLeftIcon class="w-4 h-4 mr-2" />
                      Contestar
                    </DropdownItem>
                    <DropdownItem>
                      <CornerUpRightIcon class="w-4 h-4 mr-2" />
                      Reenviar
                    </DropdownItem>
                    <DropdownItem>
                      <CopyIcon class="w-4 h-4 mr-2" />
                      Copiar
                    </DropdownItem>
                    <DropdownItem>
                      <TrashIcon class="w-4 h-4 mr-2" /> Borrar
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="clear-both"></div>
            <div class="chat__box__text-box flex items-end float-right mb-4">
              <Dropdown class="hidden sm:block mr-3 my-auto">
                <DropdownToggle
                  tag="a"
                  href="javascript:;"
                  class="w-4 h-4 text-slate-500"
                >
                  <MoreVerticalIcon class="w-4 h-4" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownHeader>Info del mensaje</DropdownHeader>
                    <DropdownItem>
                      <CheckIcon class="w-4 h-4 mr-2" />
                      Enviado <br/>10:44
                    </DropdownItem>
                    <DropdownItem>
                      <CheckCheckIcon class="w-4 h-4 mr-2" /> Entregado<br/>10:44
                    </DropdownItem>
                    <DropdownItem>
                      <CheckCheckIcon class="w-4 h-4 mr-2 text-primary" /> Leído<br/>10:46
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
              <div
                class="bg-primary px-4 py-3 text-white rounded-l-md rounded-t-md"
              >
                Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                <div class="mt-1 text-xs text-white text-opacity-80">
                  Hace 1 minuto
                </div>
              </div>
              <div
                class="w-10 h-10 hidden sm:block flex-none image-fit relative ml-5"
              >
              <ProfileAvatar :username="useAuthentication.user.name" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>
              </div>
            </div>
            <div class="clear-both"></div>
            <div class="chat__box__text-box flex items-end float-right mb-4">
              <Dropdown class="hidden sm:block mr-3 my-auto">
                <DropdownToggle
                  tag="a"
                  href="javascript:;"
                  class="w-4 h-4 text-slate-500"
                >
                  <MoreVerticalIcon class="w-4 h-4" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownHeader>Info del mensaje</DropdownHeader>
                    <DropdownItem>
                      <CheckIcon class="w-4 h-4 mr-2" />
                      Enviado <br/>10:44
                    </DropdownItem>
                    <DropdownItem>
                      <CheckCheckIcon class="w-4 h-4 mr-2" /> Entregado<br/>10:44
                    </DropdownItem>
                    <DropdownItem>
                      <CheckCheckIcon class="w-4 h-4 mr-2 text-primary" /> Leído<br/>10:46
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
              <div
                class="bg-primary px-4 py-3 text-white rounded-l-md rounded-t-md"
              >
                Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                <div class="mt-1 text-xs text-white text-opacity-80">
                 Hace 59 segundos
                </div>
              </div>
              <div
                class="w-10 h-10 hidden sm:block flex-none image-fit relative ml-5"
              >
              <ProfileAvatar :username="useAuthentication.user.name" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>
              </div>
            </div>
            <div class="clear-both"></div>
            <div
              class="text-slate-400 dark:text-slate-500 text-xs text-center mb-10 mt-5"
            >
              20 Febrero 2023
            </div>
            <div class="chat__box__text-box flex items-end float-left mb-4">
              <div
                class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5"
              >
              <ProfileAvatar :username="$f()[0]['users'][0]['name']" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>
              </div>
              <div
                class="bg-slate-100 dark:bg-darkmode-400 px-4 py-3 text-slate-500 rounded-r-md rounded-t-md"
              >
                Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor
                <div class="mt-1 text-xs text-slate-500">Hace 10 segundos</div>
              </div>
              <Dropdown class="hidden sm:block ml-3 my-auto">
                <DropdownToggle
                  tag="a"
                  href="javascript:;"
                  class="w-4 h-4 text-slate-500"
                >
                  <MoreVerticalIcon class="w-4 h-4" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownItem>
                      <CornerUpLeftIcon class="w-4 h-4 mr-2" />
                      Contestar
                    </DropdownItem>
                    <DropdownItem>
                      <CornerUpRightIcon class="w-4 h-4 mr-2" />
                      Reenviar
                    </DropdownItem>
                    <DropdownItem>
                      <CopyIcon class="w-4 h-4 mr-2" />
                      Copiar
                    </DropdownItem>
                    <DropdownItem>
                      <TrashIcon class="w-4 h-4 mr-2" /> Borrar
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="clear-both"></div>
            <div class="chat__box__text-box flex items-end float-right mb-4">
              <Dropdown class="hidden sm:block mr-3 my-auto">
                <DropdownToggle
                  tag="a"
                  href="javascript:;"
                  class="w-4 h-4 text-slate-500"
                >
                  <MoreVerticalIcon class="w-4 h-4" />
                </DropdownToggle>
                <DropdownMenu class="w-40">
                  <DropdownContent>
                    <DropdownHeader>Info del mensaje</DropdownHeader>
                    <DropdownItem>
                      <CheckIcon class="w-4 h-4 mr-2" />
                      Enviado <br/>10:44
                    </DropdownItem>
                    <DropdownItem>
                      <CheckCheckIcon class="w-4 h-4 mr-2" /> Entregado<br/>10:44
                    </DropdownItem>
                    <DropdownItem>
                      <CheckCheckIcon class="w-4 h-4 mr-2 text-primary" /> Leído<br/>10:46
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
              <div
                class="bg-primary px-4 py-3 text-white rounded-l-md rounded-t-md"
              >
                Lorem ipsum
                <div class="mt-1 text-xs text-white text-opacity-80">
                  Hace 1 segundo
                </div>
              </div>
              <div
                class="w-10 h-10 hidden sm:block flex-none image-fit relative ml-5"
              >
              <ProfileAvatar :username="useAuthentication.user.name" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>
              </div>
            </div>
            <div class="clear-both"></div>
            <div class="chat__box__text-box flex items-end float-left mb-4">
              <div
                class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5"
              >
              <ProfileAvatar :username="$f()[0]['users'][0]['name']" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>
              </div>
              <div
                class="bg-slate-100 dark:bg-darkmode-400 px-4 py-3 text-slate-500 rounded-r-md rounded-t-md"
              >
                {{ $f()[0]["users"][0]["name"] }} está escribiendo
                <span class="typing-dots ml-1">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </div>
            </div>
          </div>
          <div
            class="pt-4 pb-10 sm:py-4 flex items-center border-t border-slate-200/60 dark:border-darkmode-400"
          >
            <textarea
              class="chat__box__input form-control dark:bg-darkmode-600 h-16 resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0"
              rows="1"
              placeholder="Escribe tu mensaje..."
            ></textarea>
            <div
              class="flex absolute sm:static left-0 bottom-0 ml-5 sm:ml-0 mb-5 sm:mb-0"
            >
              <div
                class="w-4 h-4 sm:w-5 sm:h-5 relative text-slate-500 mr-3 sm:mr-5"
              >
                <PaperclipIcon class="w-full h-full cursor-pointer" />
                <input
                  type="file"
                  class="w-full h-full top-0 left-0 absolute opacity-0"
                />
              </div>
            </div>
            <a
              href="javascript:;"
              class="w-8 h-8 sm:w-10 sm:h-10 block bg-primary text-white rounded-full flex-none flex items-center justify-center mr-5"
            >
              <SendIcon class="w-4 h-4" />
            </a>
          </div>
        </div>
        <!-- END: Chat Active -->
        <!-- BEGIN: Chat Default -->
        <div v-else class="h-full flex items-center">
          <div class="mx-auto text-center">
            <div
              class="w-16 h-16 flex-none image-fit rounded-full overflow-hidden mx-auto"
            >
            <ProfileAvatar :username="useAuthentication.user.name" custom-size="4rem" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>
            </div>
            <div class="mt-3">
              <div class="font-medium">
                Hola, {{ useAuthentication.user.name }}
              </div>
              <div class="text-slate-500 mt-1">
                Selecciona un usuario o grupo.
              </div>
            </div>
          </div>
        </div>
        <!-- END: Chat Default -->
      </div>
    </div>
    <!-- END: Chat Content -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import {useAuthenticationStore} from '@/stores/auth/authentications';
import { DropdownHeader } from "../../global-components/dropdown";
import ProfileAvatar from 'vue-profile-avatar'




const chatBox = ref(false);
const showChatBox = () => {
  chatBox.value = !chatBox.value;
};

const useAuthentication = useAuthenticationStore();



</script>
