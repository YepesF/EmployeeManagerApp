import request from "supertest";
import testServer from "../../testServer";

let token, requestId;

afterAll((done) => {
  testServer.close(done);
});

describe("Fetch /requests", () => {
  it("responds with json", function (done) {
    request(testServer)
      .post("/auth/login")
      .send({
        email: "admin@example.com",
        password: "Pass1234!",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function (err, res) {
        token = res.body.token;
        if (err) return done(err);
        return done();
      });
  });

  it("should create a request", async () => {
    const response = await request(testServer)
      .post("/requests")
      .send({
        code: "REQ-1000",
        description: "test",
        summary: "test",
        employeeId: 2,
      })
      .set("Authorization", `Bearer ${token}`);
    const responseData = response.body;
    requestId = responseData.id;
    expect(response.status).toBe(201);
    expect(responseData).toHaveProperty("code", "REQ-1000");
    expect(responseData).toHaveProperty("description", "test");
    expect(responseData).toHaveProperty("summary", "test");
    expect(responseData).toHaveProperty("employeeId", 2);
  });
  it("should return a list of all requests", async () => {
    const response = await request(testServer)
      .get("/requests")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
  it("should return a request", async () => {
    const response = await request(testServer)
      .get(`/requests/${requestId}`)
      .set("Authorization", `Bearer ${token}`);

    const responseData = response.body;
    expect(response.status).toBe(200);
    expect(responseData).toHaveProperty("id", requestId);
    expect(responseData).toHaveProperty("code", "REQ-1000");
    expect(responseData).toHaveProperty("description", "test");
    expect(responseData).toHaveProperty("summary", "test");
    expect(responseData).toHaveProperty("employee", "John Doe");
  });
  it("should update a request", async () => {
    const response = await request(testServer)
      .put(`/requests/${requestId}`)
      .send({
        code: "REQ-1000",
        description: "test 2",
        summary: "test 2",
        employeeId: 2,
      })
      .set("Authorization", `Bearer ${token}`);

    const responseData = response.body;
    expect(response.status).toBe(200);
    expect(responseData).toHaveProperty("id", requestId);
    expect(responseData).toHaveProperty("code", "REQ-1000");
    expect(responseData).toHaveProperty("description", "test 2");
    expect(responseData).toHaveProperty("summary", "test 2");
    expect(responseData).toHaveProperty("employee_id", 2);
  });
  it("should delete a request", async () => {
    const response = await request(testServer)
      .delete(`/requests/${requestId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Solicitud eliminada exitosamente.");
  });
});
