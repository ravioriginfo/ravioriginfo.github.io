<script setup>
import { education, experience, profile, skills } from '../data/portfolio'
import AppIcon from '../components/AppIcon.vue'
import SectionHeading from '../components/SectionHeading.vue'
import SkillBadge from '../components/SkillBadge.vue'
import TimelineItem from '../components/TimelineItem.vue'
</script>

<template>
  <div class="container-page py-16 sm:py-20">
    <section class="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <SectionHeading eyebrow="// about" title="About me" />
        <div class="space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          <p v-for="(para, i) in profile.bio" :key="i">{{ para }}</p>
        </div>
      </div>
      <aside class="card h-fit p-6">
        <dl class="space-y-4 text-sm">
          <div>
            <dt class="text-slate-500">Role</dt>
            <dd class="font-medium text-slate-900 dark:text-white">{{ profile.role }}</dd>
          </div>
          <div>
            <dt class="text-slate-500">Location</dt>
            <dd class="flex items-center gap-1 font-medium text-slate-900 dark:text-white">
              <AppIcon name="pin" class="size-4" /> {{ profile.location }}
            </dd>
          </div>
          <div>
            <dt class="text-slate-500">Email</dt>
            <dd>
              <a :href="`mailto:${profile.email}`" class="font-medium text-brand-600 hover:underline dark:text-brand-400">
                {{ profile.email }}
              </a>
            </dd>
          </div>
        </dl>
        <a v-if="profile.resumeUrl" :href="profile.resumeUrl" target="_blank" class="btn-primary mt-6 w-full justify-center">
          <AppIcon name="download" class="size-4" /> Download resume
        </a>
      </aside>
    </section>

    <section class="mt-20">
      <SectionHeading eyebrow="// skills" title="Skills & tools" />
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="g in skills" :key="g.group" class="card p-6">
          <h3 class="mb-4 font-semibold">{{ g.group }}</h3>
          <div class="flex flex-wrap gap-2">
            <SkillBadge v-for="s in g.items" :key="s" :label="s" />
          </div>
        </div>
      </div>
    </section>

    <section class="mt-20 grid gap-16 lg:grid-cols-2">
      <div>
        <SectionHeading eyebrow="// experience" title="Experience" />
        <ol>
          <TimelineItem v-for="(e, i) in experience" :key="i" :item="e" />
        </ol>
      </div>
      <div>
        <SectionHeading eyebrow="// education" title="Education" />
        <ol>
          <TimelineItem v-for="(e, i) in education" :key="i" :item="e" />
        </ol>
      </div>
    </section>
  </div>
</template>
