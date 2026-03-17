def test_topics_endpoints_flow(client):
    create_response = client.post("/api/topics", json={"content": "Tema integración"})
    assert create_response.status_code == 201

    created_topic = create_response.get_json()
    assert created_topic["content"] == "Tema integración"
    assert created_topic["likes"] == 0

    list_response = client.get("/api/topics")
    assert list_response.status_code == 200
    payload = list_response.get_json()
    assert "topics" in payload
    assert len(payload["topics"]) == 1

    topic_id = created_topic["id"]
    detail_response = client.get(f"/api/topics/{topic_id}")
    assert detail_response.status_code == 200
    assert detail_response.get_json()["id"] == topic_id


def test_like_endpoint_increments(client):
    create_response = client.post("/api/topics", json={"content": "Tema con likes"})
    topic_id = create_response.get_json()["id"]

    like1 = client.post(f"/api/topics/{topic_id}/like")
    like2 = client.post(f"/api/topics/{topic_id}/like")

    assert like1.status_code == 200
    assert like2.status_code == 200
    assert like1.get_json()["likes"] == 1
    assert like2.get_json()["likes"] == 2


def test_responses_endpoints_flow(client):
    topic_response = client.post("/api/topics", json={"content": "Tema para respuestas"})
    topic_id = topic_response.get_json()["id"]

    create_response = client.post(
        "/api/responses",
        json={"topic_id": topic_id, "content": "Primera respuesta"},
    )
    assert create_response.status_code == 201

    list_responses = client.get(f"/api/topics/{topic_id}/responses")
    assert list_responses.status_code == 200
    payload = list_responses.get_json()
    assert isinstance(payload, list)
    assert len(payload) == 1
    assert payload[0]["content"] == "Primera respuesta"


def test_responses_validation_error_when_topic_missing(client):
    response = client.post("/api/responses", json={"content": "sin topic"})
    assert response.status_code == 400
    assert response.get_json()["error"] == "Se requiere topic_id"
