import groupByUser from "../components/functions/groupByUser";
import { messagedProductAuthor } from "./helpers";

describe("Function to group by user conversation", () => {
  test("Creates separate arrays of conversations with different users", () => {
    expect(
      groupByUser(messagedProductAuthor.messages, messagedProductAuthor.user_id)
    ).toEqual(
      new Map(
        Object.entries({
          "Username 9": [
            {
              sender: 9,
              receiver: 7,
              text: "Ducimus voluptate quia quas commodi aut, fugiat maw.",
              time: "2022-01-01T03:25:52.456Z",
              senderName: "Username 9",
            },

            {
              sender: 9,
              receiver: 7,
              text: "Nihil quas error voluptatibus quaerat sit. Non nemo sequi na.",
              time: "2022-01-02T00:42:43.113Z",
              senderName: "Username 9",
            },
            {
              sender: 9,
              receiver: 7,
              text: "Facilis error a eos consequunturw.",
              time: "2022-01-04T21:29:13.168Z",
              senderName: "Username 9",
            },

            {
              sender: 7,
              receiver: 9,
              text: "At vel rerum ullam rerum quasi occaecati sit maiores aut sunt voluptatibus qui enim voluptatibus nostrum, facill.",
              time: "2022-01-24T08:20:46.030Z",
              senderName: "Username 7",
            },
            {
              sender: 9,
              receiver: 7,
              text: "Et consequuntur vitae enim nulla nulla blanditiis facilis ullam h.",
              time: "2022-01-29T14:30:46.389Z",
              senderName: "Username 9",
            },
            {
              sender: 9,
              receiver: 7,
              text: "Magnam sed labore esse cum beatae esse. Possimus sunt beatae beatae, tenetur consectetur consequatur vitae est,z.",
              time: "2022-01-29T21:30:10.386Z",
              senderName: "Username 9",
            },
            {
              sender: 9,
              receiver: 7,
              text: "Rerum unde aliw.",
              time: "2022-02-09T23:29:05.769Z",
              senderName: "Username 9",
            },
            {
              sender: 7,
              receiver: 9,
              text: "Sapiente ducimus consequatur non non fugiat qui qui sit qui nulla. A numquam dicta ullam neque quas voluptatem quv.",
              time: "2022-02-18T12:24:48.776Z",
              senderName: "Username 7",
            },

            {
              sender: 9,
              receiver: 7,
              text: "Excepturi tenetur fugit cupiditate, exercitationem quas, aliquid voluptate voluptatem reiciendis omnis excepturl.",
              time: "2022-03-09T13:13:04.553Z",
              senderName: "Username 9",
            },
            {
              sender: 9,
              receiver: 7,
              text: "Voluptatx.",
              time: "2022-03-17T01:24:19.619Z",
              senderName: "Username 9",
            },
          ],
          "Username 8": [
            {
              sender: 8,
              receiver: 7,
              text: "Fugiat magnb.",
              time: "2022-01-01T17:32:23.573Z",
              senderName: "Username 8",
            },

            {
              sender: 8,
              receiver: 7,
              text: "Possimus cupiditate sapiente quia. Exercitationem beatae exercitationem at possimn.",
              time: "2022-01-11T05:49:18.527Z",
              senderName: "Username 8",
            },
            {
              sender: 8,
              receiver: 7,
              text: "Voluptatem exercitationem ducimus et tenetur quaerat excepturi unde, dictao.",
              time: "2022-01-18T00:41:45.037Z",
              senderName: "Username 8",
            },
            {
              sender: 8,
              receiver: 7,
              text: "Consectetur voluptat.",
              time: "2022-01-19T16:18:24.580Z",
              senderName: "Username 8",
            },
            {
              sender: 8,
              receiver: 7,
              text: "Nemo tenetur est facilis numquam cum v.",
              time: "2022-02-07T04:16:04.500Z",
              senderName: "Username 8",
            },
            {
              sender: 8,
              receiver: 7,
              text: "Quae tenetur quas hic beatae vel in est est.v.",
              time: "2022-02-21T19:56:12.732Z",
              senderName: "Username 8",
            },
            {
              sender: 7,
              receiver: 8,
              text: "Consequatur reiciendis occaecati consequuntur error, tenetur magnam, maiores necessitatibus omnis necessitatibus quos dc.",
              time: "2022-03-06T04:17:20.576Z",
              senderName: "Username 7",
            },
            {
              sender: 7,
              receiver: 8,
              text: "Sed tenetur reiciendis quos consectetur sed sed rerum quas, repellat consequaw.",
              time: "2022-03-18T02:06:59.321Z",
              senderName: "Username 7",
            },
            {
              sender: 7,
              receiver: 8,
              text: "Exercitationem voluptatibus occaecati rerum rerum enim, possimus cupiditatei.",
              time: "2022-03-26T05:13:20.205Z",
              senderName: "Username 7",
            },
            {
              sender: 8,
              receiver: 7,
              text: "Neque sed quia in ullam voluptatibus, nostrum in, cupiditate fugiq.",
              time: "2022-03-26T17:30:54.467Z",
              senderName: "Username 8",
            },
          ],
        })
      )
    );
  });
});
