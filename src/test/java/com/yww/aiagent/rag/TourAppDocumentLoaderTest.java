package com.yww.aiagent.rag;

import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TourAppDocumentLoaderTest {

    @Resource
    private TourAppDocumentLoader tourAppDocumentLoader;

    @Test
    void loadMarkdowns() {
        tourAppDocumentLoader.loadMarkdowns();
    }
}