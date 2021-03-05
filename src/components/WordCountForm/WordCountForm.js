import { Button, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const LimitedWordTextarea = ({ value, limit }) => {
  const [{ content, wordCount }, setContent] = useState({
    content: value,
    wordCount: 0,
  });

  const [copyArea, setCopyArea] = useState({});

  const copyText = (word) => {
    const copyResult = word?.split(" ")?.filter(Boolean)?.join(" ,");
    setCopyArea(copyResult);
  };

  const setFormattedContent = useCallback(
    (text) => {
      let words = text?.split(" ")?.filter(Boolean);
      if (words?.length > limit) {
        setContent({
          content: words?.slice(0, limit).join(","),
          wordCount: limit,
        });
      } else {
        setContent({
          content: text,
          wordCount: words?.length,
        });
      }
    },
    [limit, setContent]
  );

  useEffect(() => {
    setFormattedContent(content);
    copyText(content);
  }, [setFormattedContent, content]);

  return (
    <>
      <TextField
        onChange={(event) => setFormattedContent(event.target.value)}
        value={content}
        margin="normal"
        variant="outlined"
        helperText={`${wordCount === undefined ? 0 : wordCount}`}
      />
      <CopyToClipboard text={copyArea} variant="outlined" color="primary">
        <Button>Copy</Button>
      </CopyToClipboard>
    </>
  );
};
