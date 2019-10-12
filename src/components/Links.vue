<template>
  <div class="links">
    <h2>Links</h2>
    <md-table v-if="links">
      <md-table-row>
        <md-table-head>Rel</md-table-head>
        <md-table-head>Title</md-table-head>
        <md-table-head>Name/Index</md-table-head>
        <md-table-head>Docs</md-table-head>
        <md-table-head>Actions</md-table-head>
      </md-table-row>

      <md-table-row v-for="(link, index) in links" :key="link.rel">
        <md-table-cell>{{ link.rel }}</md-table-cell>
        <md-table-cell>{{ link.title }}</md-table-cell>
        <md-table-cell>{{ link.name ? 'name: ' + link.name : 'index: ' + index}}</md-table-cell>
        <md-table-cell>Male</md-table-cell>
        <md-table-cell>Assistant Media Planner</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  methods: {
    testComponent: () => {
      console.log('testComponent executed');
      return 'testComponent return'
    }
  },
  name: 'Links',
  data: () => ({
    // links: [],
    users: [
      {
        id: 1,
        name: 'Shawna Dubbin',
        email: 'sdubbin0@geocities.com',
        gender: 'Male',
        title: 'Assistant Media Planner'
      },
      {
        id: 2,
        name: 'Odette Demageard',
        email: 'odemageard1@spotify.com',
        gender: 'Female',
        title: 'Account Coordinator'
      },
      {
        id: 3,
        name: 'Vera Taleworth',
        email: 'vtaleworth2@google.ca',
        gender: 'Male',
        title: 'Community Outreach Specialist'
      },
      {
        id: 4,
        name: 'Lonnie Izkovitz',
        email: 'lizkovitz3@youtu.be',
        gender: 'Female',
        title: 'Operator'
      },
      {
        id: 5,
        name: 'Thatcher Stave',
        email: 'tstave4@reference.com',
        gender: 'Male',
        title: 'Software Test Engineer III'
      },
      {
        id: 6,
        name: 'Karim Chipping',
        email: 'kchipping5@scribd.com',
        gender: 'Female',
        title: 'Safety Technician II'
      },
      {
        id: 7,
        name: 'Helge Holyard',
        email: 'hholyard6@howstuffworks.com',
        gender: 'Female',
        title: 'Internal Auditor'
      },
      {
        id: 8,
        name: 'Rod Titterton',
        email: 'rtitterton7@nydailynews.com',
        gender: 'Male',
        title: 'Technical Writer'
      },
      {
        id: 9,
        name: 'Gawen Applewhite',
        email: 'gapplewhite8@reverbnation.com',
        gender: 'Female',
        title: 'GIS Technical Architect'
      },
      {
        id: 10,
        name: 'Nero Mulgrew',
        email: 'nmulgrew9@plala.or.jp',
        gender: 'Female',
        title: 'Staff Scientist'
      },
      {
        id: 11,
        name: 'Cybill Rimington',
        email: 'crimingtona@usnews.com',
        gender: 'Female',
        title: 'Assistant Professor'
      },
      {
        id: 12,
        name: 'Maureene Eggleson',
        email: 'megglesonb@elpais.com',
        gender: 'Male',
        title: 'Recruiting Manager'
      },
      {
        id: 13,
        name: 'Cortney Caulket',
        email: 'ccaulketc@cbsnews.com',
        gender: 'Male',
        title: 'Safety Technician IV'
      },
      {
        id: 14,
        name: 'Selig Swynfen',
        email: 'sswynfend@cpanel.net',
        gender: 'Female',
        title: 'Environmental Specialist'
      },
      {
        id: 15,
        name: 'Ingar Raggles',
        email: 'iragglese@cbc.ca',
        gender: 'Female',
        title: 'VP Sales'
      },
      {
        id: 16,
        name: 'Karmen Mines',
        email: 'kminesf@topsy.com',
        gender: 'Male',
        title: 'Administrative Officer'
      },
      {
        id: 17,
        name: 'Salome Judron',
        email: 'sjudrong@jigsy.com',
        gender: 'Male',
        title: 'Staff Scientist'
      },
      {
        id: 18,
        name: 'Clarinda Marieton',
        email: 'cmarietonh@theatlantic.com',
        gender: 'Male',
        title: 'Paralegal'
      },
      {
        id: 19,
        name: 'Paxon Lotterington',
        email: 'plotteringtoni@netvibes.com',
        gender: 'Female',
        title: 'Marketing Assistant'
      },
      {
        id: 20,
        name: 'Maura Thoms',
        email: 'mthomsj@webeden.co.uk',
        gender: 'Male',
        title: 'Actuary'
      }
    ]
  }),
  computed: {
    links () {
      const responseBody = this.$store.getters.responseBody;
      // console.log('responseBody', responseBody)
      // console.log('test', this.methods.testComponent())
      try {
        const body = JSON.parse(JSON.stringify(responseBody));
        // console.log('links', body ? body._links : [])

        if (!body || !body._links) {
          return [];
        }

        const l = Object.keys(body._links).map((link) => {
          if (link === 'curies') {
            return {};
          }
          return {
            ...body._links[link],
            rel: link,
            name: link
          }
        })
        // console.log('l', l);
        return l;
      } catch (e) {
        return [];
      }
    }
  }
}

// const formatCuries = () => {
//
// }
</script>

<style>
  .links {
    width: 100%;
  }

  .md-table, .md-table-content {
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
