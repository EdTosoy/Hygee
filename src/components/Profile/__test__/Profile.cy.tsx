import { Profile } from "components";

describe("<Profile />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Profile />);
  });
});
