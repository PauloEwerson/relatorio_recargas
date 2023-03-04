module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Analytics', [
      {
        meta: 0,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Analytics', null, {});
  },
};
