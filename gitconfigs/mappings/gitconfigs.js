module.exports.render = function (data) {
  const mapping = {
    locations: [],
  };

  for (repo of Object.keys(data.context.repos)) {
    const templates = Object.assign(
      data.context.repos[repo],
      data.context.common_templates,
    );

    for (const template of Object.keys(templates)) {
      mapping.locations.push({
        contextSelector: `repos.${repo}`,
        template: `${template}.njk`,
        destination: {
          type: "tpd-github",
          params: {
            repo: `gitops-toolbox/${repo}`,
            filepath: ".github/workflows/npm-test.yaml",
          },
        },
      });
    }
  }

  return mapping;
};
